'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GallerySchema = new Schema({
    title: String,
    shortDescription: String,
    description: String,
    imageID: String,
    imageFormat: String,
    transformations: String,
    price: Number,
    salePrice: Number,
    quantity: Number,
    commissionOnly: Boolean,
    displayOnHome: Boolean,
    active: Boolean,
    category: []
});

module.exports = mongoose.model('Gallery', GallerySchema);