'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GallerySchema = new Schema({
    title: String,
    shortDescription: String,
    description: String,
    images: [{ 
        id: String, 
        format: String,
        transformations: String,
        order: Number,
        mainView: Boolean
    }],
    price: Number,
    salePrice: Number,
    quantity: Number,
    displayOnHome: Boolean,
    active: Boolean,
    category: []
});

module.exports = mongoose.model('Gallery', GallerySchema);