'use strict';

var _ = require('lodash');
var Contact = require('./contact.model');
var config = require('../../config/environment');
var postmark = require("postmark")(config.postmark.api_key);

// Creates a new contact in the DB.
exports.mail = function (req, res) {
    postmark.send({
        "From": req.email,
        "To": config.app.contact_email,
        "Subject": config.app.name +  " | Inquiry: " + req.subject,
        "TextBody": req.body
    });
    return res.json(200, "success");
};

function handleError(res, err) {
    return res.send(500, err);
}