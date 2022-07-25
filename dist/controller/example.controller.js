"use strict";
exports.__esModule = true;
exports.get = void 0;
var get = function (req, res) {
    res.status(200).send({ message: "Example success.", success: true });
};
exports.get = get;
