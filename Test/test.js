'use strict';
const Joi = require('joi');
const request = require('supertest');
const expect = require('chai').expect;
const joiAssert = require('joi-assert');
const {
schemaFilmeValido,
schemanheritingRating
} = require('../Schemas/schemas');
const URL = 'http://www.mocky.io/';
const PATH = 'v2/5a5cb3872e00005e199f83db'
describe('Teste Contrato API', function () {
 it('Validando response com joiAssert', function (done) {
   request(URL)
     .get(PATH)
     .expect('Content-Type', /json/)
     .end(function (err, res) {
       expect(res.status).to.be.eql(200);
       joiAssert(res.body, schemaFilmeValido);
       done(err);
     })
 });
/* abortEarly: true. Para a validação assim que ocorre o primeiro erro,
       abortEarly: false. Retorna todos os erros encontrados no schema.
       Por default esse tag é true */
 it('Validando response com Joi.validate', function (done) {
   request(URL)
     .get(PATH)
     .expect('Content-Type', /json/)
     .end(function (err, res) {
       expect(res.status).to.be.eql(200);
       Joi.validate(res.body, schemaFilmeValido, {
         abortEarly: false
       }, (err, data) => {
         if (err) throw err;
       });
       done(err);
     })
 });
 it('Validando response utilizando schema conjugado', function (done) {
   request(URL)
     .get(PATH)
     .expect('Content-Type', /json/)
     .end(function (err, res) {
       expect(res.status).to.be.eql(200);
       Joi.validate(res.body, schemanheritingRating, {
         abortEarly: false
       }, (err, data) => {
         if (err) throw err;
       });
       done(err);
     })
 });
});