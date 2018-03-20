"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var jwt = require("jwt-simple");
var bcrypt = require("bcrypt");
var config = require('../../config/env/config')();
var Handlers = /** @class */ (function () {
    function Handlers() {
    }
    Handlers.prototype.authFail = function (req, res) {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
    };
    ;
    Handlers.prototype.authSuccess = function (res, credentials, data) {
        var isMatch = bcrypt.compareSync(credentials.password, data.password);
        if (isMatch) {
            var payload = { id: data.id };
            res.json({
                token: jwt.encode(payload, config.secret)
            });
        }
        else {
            res.status(HTTPStatus.UNAUTHORIZED);
        }
    };
    ;
    Handlers.prototype.onError = function (res, message, error) {
        console.log("Error: " + error);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    };
    ;
    Handlers.prototype.onSuccess = function (res, data) {
        res.status(HTTPStatus.OK).json({ payload: data });
    };
    ;
    Handlers.prototype.errorHandlerApi = function (err, req, res, next) {
        console.error("API error handler was executed: " + err);
        res.status(500).json({
            errorCode: 'ERR-001',
            errorMessage: 'Internal Server Error'
        });
    };
    ;
    Handlers.prototype.dbErrorHandler = function (res, error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-01',
            message: 'Erro ao criar usuário'
        });
    };
    return Handlers;
}());
exports.default = new Handlers();
