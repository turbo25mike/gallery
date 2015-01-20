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
router.post('/upload', multipartyMiddleware, auth.isAuthenticated(), controller.uploadImage);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;