'use strict';

var _ = require('lodash');
var Contact = require('./contact.model');
var config = require('../../config/environment');
var postmark = require("postmark")(config.postmark.api_key);


// Get list of contacts
exports.index = function(req, res) {
  Contact.find(function (err, contacts) {
    if(err) { return handleError(res, err); }
    return res.json(200, contacts[0]);
  });
};

// Creates a new contact in the DB.
exports.create = function(req, res) {
  Contact.create(req.body, function(err, contact) {
    if(err) { return handleError(res, err); }
    return res.json(201, contact);
  });
};

// Updates an existing contact in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Contact.findById(req.params.id, function (err, contact) {
    if (err) { return handleError(res, err); }
    if(!contact) { return res.send(404); }
    var updated = _.merge(contact, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, contact);
    });
  });
};

// Send a mail to the main contact
exports.mail = function (req, res) {
    
    var contact;
    
    Contact.find(function (err, contacts) {
    if(err) { return handleError(res, err); }
        contact = contacts[0];
    });
    
    console.log('postmark key: ' + config.postmark.api_key);
    console.log('postmark to: ' + contact.email);
    console.log('postmark subject: ' + config.app.name +  " Contact | " + req.body.subject);
    console.log('postmark Body: ' + req.body.name + "\n" + req.body.email + "\n\n" + req.body.message);
    postmark.send({
        "From": contact.email,
        "To": contact.email,
        "Subject": config.app.name +  " Contact | " + req.subject,
        "TextBody": req.name + "\n" + req.email + "\n\n" + req.message
    });
    return res.json(200, "success");
};

function handleError(res, err) {
    return res.send(500, err);
}