"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
var model = require('../../server/models');
describe('Unit Tests', function () {
    var email;
    var _id;
    var defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'defaultuser@email.com',
        password: '1234'
    };
    beforeEach(function (done) {
        model.User.destroy({
            where: {}
        })
            .then(function () {
            model.User.create(defaultUser).then(function () {
                console.log('Default User Created');
                done();
            });
        });
    });
    describe('Create Method', function () {
        it('Should be create new user', function () {
            var newUser = {
                id: 2,
                name: 'New User',
                email: 'newUser@email.com',
                password: '1234'
            };
            var user = service_1.default;
            return user.create(newUser)
                .then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys(['id', 'name', 'email', 'password', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Get All Method', function () {
        it('Should be return all users', function () {
            return service_1.default.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
            });
        });
    });
    describe('Get By ID Method', function () {
        it('Should be return an user', function () {
            return service_1.default.getById(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['id', 'name', 'email', 'password']);
            });
        });
    });
    describe('Get By Email Method', function () {
        it('Should be return an user', function () {
            return service_1.default.getByEmail(defaultUser.email).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['id', 'name', 'email', 'password']);
            });
        });
    });
    describe('Update Method', function () {
        it('Should be update a user', function () {
            var userUpdated = {
                name: 'User Updated',
                email: 'user@updated'
            };
            return service_1.default.update(defaultUser.id, userUpdated).then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Delete Method', function () {
        it('Should be delete a user', function () {
            return service_1.default.delete(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
