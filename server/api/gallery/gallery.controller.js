'use strict';

var _ = require('lodash');
var Gallery = require('./gallery.model');
var config = require('../../config/environment');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

exports.uploadImage = function(req, res){
    var file = req.files.file;
    console.log(file.name);
    console.log(file.type);
    console.log(file.path);
    console.log(config.cloudinary.cloud_name);
    cloudinary.uploader.upload(
      file.path,
    function (result) {
        var output = '';
for (var property in result) {
  output += property + ': ' + result[property]+'; ';
}
        
        console.log('cloudinary results: ' + output);
    });
};

// Get list of gallerys
exports.index = function (req, res) {
    Gallery.find(function (err, gallerys) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, gallerys);
    });
};

// Get a single gallery
exports.show = function (req, res) {
    Gallery.findById(req.params.id, function (err, gallery) {
        if (err) {
            return handleError(res, err);
        }
        if (!gallery) {
            return res.send(404);
        }
        return res.json(gallery);
    });
};

// Creates a new gallery in the DB.
exports.create = function (req, res) {

    

    Gallery.create(req.body, function (err, gallery) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, gallery);
    });
};

// Updates an existing gallery in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Gallery.findById(req.params.id, function (err, gallery) {
        if (err) {
            return handleError(res, err);
        }
        if (!gallery) {
            return res.send(404);
        }
        var updated = _.merge(gallery, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, gallery);
        });
    });
};

// Deletes a gallery from the DB.
exports.destroy = function (req, res) {
    Gallery.findById(req.params.id, function (err, gallery) {
        if (err) {
            return handleError(res, err);
        }
        if (!gallery) {
            return res.send(404);
        }
        gallery.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}