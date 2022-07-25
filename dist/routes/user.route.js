"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = require("../controller/user.controller");
var route = (0, express_1.Router)();
route.post('/create', user_controller_1.create);
route.post('/login', user_controller_1.login);
//@ts-ignore
route.use(user_controller_1.verifyAndAddUser);
//@ts-ignore
route.get('/get', user_controller_1.get);
//@ts-ignore
route.post('/update', user_controller_1.update);
exports["default"] = route;
