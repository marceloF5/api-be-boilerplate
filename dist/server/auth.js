"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
var service_1 = require("./modules/User/service");
var config = require('./config/env/config')();
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.config = function () {
        var opts = {
            secretOrKey: config.secret,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt')
        };
        passport.use(new passport_jwt_1.Strategy(opts, function (jwtPayload, done) {
            service_1.default.getById(jwtPayload.id)
                .then(function (data) {
                if (data) {
                    return done(null, {
                        id: data.id,
                        email: data.email
                    });
                }
                return done(null, false);
            })
                .catch(function (error) {
                done(error, null);
            });
        }));
        return {
            initialize: function () { return passport.initialize(); },
            authenticate: function () { return passport.authenticate('jwt', { session: false }); }
        };
    };
    return Auth;
}());
exports.default = new Auth();
