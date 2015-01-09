'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GallerySchema = new Schema({
  name: String,
  fileName: String,
  forSale: Boolean,
  price: Number,
  displayOnHome: Boolean,
  width: Number,
  height: Number,
  depth: Number,
  description: String,
  active: Boolean,
  category: String
});

module.exports = mongoose.model('Gallery', GallerySchema);