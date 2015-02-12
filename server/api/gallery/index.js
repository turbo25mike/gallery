'use strict';

var express = require('express');
var controller = require('./gallery.controller');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/home', controller.homeGallery);
router.get('/:id', controller.show);
router.post('/upload', multipartyMiddleware, auth.hasRole('admin'), controller.uploadImage);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;