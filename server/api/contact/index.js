'use strict';

var express = require('express');
var controller = require('./contact.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.post('/mail', controller.mail);
router.put('/', auth.hasRole('admin'), controller.update);


module.exports = router;