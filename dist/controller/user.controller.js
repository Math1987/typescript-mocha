"use strict";
exports.__esModule = true;
exports.update = exports.get = exports.verifyAndAddUser = exports.login = exports.create = void 0;
var user_engine_1 = require("../engine/user.engine");
var user_data_1 = require("../datas/user.data");
var create = function (req, res) {
    if (req.body.email && req.body.password) {
        console.log('create account', req.body);
        (0, user_engine_1.createUser)(req.body).then(function (user) {
            res.status(200).send(user);
        })["catch"](function (err) {
            res.status(501).send(err);
        });
    }
    else {
        res.status(201).send({ error: 'Need at least email and password' });
    }
};
exports.create = create;
var login = function (req, res) {
    if (req.body.email && req.body.password) {
        (0, user_engine_1.login)(req.body.email, req.body.password).then(function (user) {
            res.status(200).send(user);
        })["catch"](function (err) {
            res.status(501).send(err);
        });
    }
    else {
        res.status(201).send({ error: 'Need at least email and password' });
    }
};
exports.login = login;
var verifyAndAddUser = function (req, res, next) {
    console.log('authorization check');
    console.log('authorization token', req.headers.authorization);
    if (req.headers.authorization) {
        (0, user_engine_1.readUserFromToken)(req.headers.authorization).then(function (user) {
            req.user = user;
            next();
        })["catch"](function (err) {
            res.status(401).send({ error: "Authorization rejected" });
        });
    }
    else {
        res.status(401).send({ error: "Need authorization!" });
    }
};
exports.verifyAndAddUser = verifyAndAddUser;
var get = function (req, res) {
    if (req.user) {
        res.status(200).send(req.user);
    }
    else {
        res.status(401).send({ error: "Need authorization!" });
    }
};
exports.get = get;
var update = function (req, res) {
    console.log('update', req.user, req.body);
    if (req.user) {
        (0, user_data_1.updateOne)(req.user._id, req.body).then(function (nu) {
            res.status(200).send(nu);
        })["catch"](function (err) {
            res.status(401).send({ error: "update fail" });
        });
    }
    else {
        res.status(401).send({ error: "Need authorization!" });
    }
};
exports.update = update;
