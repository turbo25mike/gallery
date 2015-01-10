'use strict';

var _ = require('lodash');
var AppSettings = require('./appSettings.model');
var config = require('../../config/environment');

// Get list of appSettingss
exports.index = function(req, res) {
  AppSettings.find(function (err, appSettingss) {
    if(err) { return handleError(res, err); }
    return res.json(200, appSettingss);
  });
};

// Get a single appSettings
exports.show = function(req, res) {
  AppSettings.findById(req.params.id, function (err, appSettings) {
    if(err) { return handleError(res, err); }
    if(!appSettings) { return res.send(404); }
    return res.json(appSettings);
  });
};

// Creates a new appSettings in the DB.
exports.create = function(req, res) {
  AppSettings.create(req.body, function(err, appSettings) {
    if(err) { return handleError(res, err); }
    return res.json(201, appSettings);
  });
};

// Updates an existing appSettings in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  AppSettings.findById(req.params.id, function (err, appSettings) {
    if (err) { return handleError(res, err); }
    if(!appSettings) { return res.send(404); }
    var updated = _.merge(appSettings, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, appSettings);
    });
  });
};

// Deletes a appSettings from the DB.
exports.destroy = function(req, res) {
  AppSettings.findById(req.params.id, function (err, appSettings) {
    if(err) { return handleError(res, err); }
    if(!appSettings) { return res.send(404); }
    appSettings.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.googleID = function(req, res){
     return res.json(config.analytics.googleID);  
}

function handleError(res, err) {
  return res.send(500, err);
}