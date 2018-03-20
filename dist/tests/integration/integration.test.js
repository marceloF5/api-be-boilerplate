"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jwt-simple");
var HTTPStatus = require("http-status");
var helpers_1 = require("./config/helpers");
//import { userInfo } from 'os';
describe('Integration Tests', function () {
    'use strict';
    var config = require('../../server/config/env/config')();
    var model = require('../../server/models');
    var id;
    var token;
    var userTest = {
        id: 100,
        name: 'Test User',
        email: 'test@email.com',
        password: 'test'
    };
    var userDefault = {
        id: 1,
        name: 'Default User',
        email: 'default@email.com',
        password: 'default'
    };
    beforeEach('Executing BeforeEach', function (done) {
        model.User.destroy({
            where: {}
        }).then(function () {
            return model.User.create(userDefault);
        }).then(function (user) {
            model.User.create(userTest)
                .then(function () {
                token = jwt.encode({ id: user.id }, config.secret);
                done();
            });
        });
    });
    describe('POST /token', function () {
        it('Should be return JWT', function (done) {
            var credencials = {
                email: userDefault.email,
                password: userDefault.password
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credencials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.token).to.equal("" + token);
                done(error);
            });
        });
        it('Should not be return TOKEN', function (done) {
            var credencials = {
                email: 'email@qualqueremail.com',
                password: 'qualquersenha'
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credencials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(error);
            });
        });
    });
    describe('GET /api/users/all', function () {
        it('Should be return all users (Array)', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', function () {
        it('Should be return an user (JSON)', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + userDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equal(userDefault.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'id', 'name', 'email', 'password'
                ]);
                id = res.body.payload.id;
                done(error);
            });
        });
    });
    describe('POST /api/users/create', function () {
        it('Should be create a new user', function (done) {
            var user = {
                id: 2,
                name: 'Test User Create',
                email: 'test.create.user@email.com',
                password: 'test'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equal(user.id);
                helpers_1.expect(res.body.payload.name).to.equal(user.name);
                helpers_1.expect(res.body.payload.email).to.equal(user.email);
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', function () {
        it('Should be update an user', function (done) {
            var user = {
                name: 'TesteUpdate',
                email: 'testeupdate@email.com'
            };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + userTest.id + "/update")
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload[0]).to.equal(1);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', function () {
        it('Should be delete an user', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/users/" + userTest.id + "/destroy")
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.equal(1);
                done(error);
            });
        });
    });
});
