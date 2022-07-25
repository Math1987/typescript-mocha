"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var index_data_1 = require("./datas/index.data");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
(0, index_data_1.init)();
var express_1 = __importDefault(require("express"));
exports.app = (0, express_1["default"])();
exports.app.use(body_parser_1["default"].json());
exports.app.use(body_parser_1["default"].urlencoded({ extended: true }));
// const corsOptions : cors.CorsOptions = {
//     origin : environment.origins,
// }
exports.app.use((0, cors_1["default"])());
exports.app.use((0, morgan_1["default"])("tiny"));
var example_route_1 = __importDefault(require("./routes/example.route"));
var user_route_1 = __importDefault(require("./routes/user.route"));
exports.app.use('', function (req, res, next) {
    console.log('api called');
    next();
});
exports.app.get('', function (req, res) { return res.status(200).send('Welcome!'); });
exports.app.use(example_route_1["default"]);
exports.app.use("/u", user_route_1["default"]);
console.log('running in ' + process.env.MODE + " mode");
if (process.env.MODE === "dev") {
    console.log('listening on port 17000');
    exports.app.listen(17000);
}
