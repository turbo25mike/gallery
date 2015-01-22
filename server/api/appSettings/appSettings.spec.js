'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/appSettings', function() {

  it('should respond with JSON object', function(done) {
    request(app)
      .get('/api/appSettings')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});