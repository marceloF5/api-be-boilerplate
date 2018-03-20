"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var api_1 = require("./api/api");
var models = require('./models');
var config = require('./config/env/config')();
var server = http.createServer(api_1.default);
models.sequelize.sync().then(function () {
    //server.listen(3000, () => console.log('Server is running on port 3000')); //OR
    server.listen(3000);
    server.on('listening', function () { return console.log("Server is running on port 3000"); });
    server.on('error', function (error) { return console.log("Error: " + error); });
});
