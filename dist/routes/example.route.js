"use strict";
exports.__esModule = true;
var express_1 = require("express");
var example_controller_1 = require("../controller/example.controller");
var route = (0, express_1.Router)();
route.get('/example', example_controller_1.get);
exports["default"] = route;
