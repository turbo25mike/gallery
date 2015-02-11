'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    latitude: Number,
    longitude: Number,
    map_zoom: Number
});

module.exports = mongoose.model('Contact', ContactSchema);