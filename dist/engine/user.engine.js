"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.readUserFromToken = exports.createToken = exports.login = exports.createUser = void 0;
var user_data_1 = require("../datas/user.data");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var saltRounds = 10;
var secret = "ChooseASecretYouAreTheOnlyOneToReadyKnow.7654123456!!";
var createUser = function (datas) {
    return new Promise(function (resolve, reject) {
        bcrypt_1["default"].hash(datas.password, saltRounds, function (err, hash) {
            var _this = this;
            // Store hash in your password DB.
            if (hash) {
                (0, user_data_1.create)({
                    email: datas.email,
                    password: hash,
                    language: (datas.language ? datas.language : "en")
                }).then(function (u) { return __awaiter(_this, void 0, void 0, function () {
                    var user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, exports.createToken)(u._id.toString())];
                            case 1:
                                user = _a.sent();
                                resolve(user);
                                return [2 /*return*/];
                        }
                    });
                }); })["catch"](function (err) {
                    console.log(err);
                    reject(err);
                });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.createUser = createUser;
var login = function (email, password) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, user_data_1.readOneByEmail)(email)];
                case 1:
                    user = _a.sent();
                    bcrypt_1["default"].compare(password, user.password, function (err, result) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!result) return [3 /*break*/, 2];
                                        return [4 /*yield*/, (0, exports.createToken)(user._id.toString())];
                                    case 1:
                                        user = _a.sent();
                                        resolve(user);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        reject(err);
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.login = login;
var createToken = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = jsonwebtoken_1["default"].sign(JSON.stringify({ _id: userId }), secret);
                return [4 /*yield*/, (0, user_data_1.updateOne)(userId, { token: token })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createToken = createToken;
var readUserFromToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var datas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                datas = jsonwebtoken_1["default"].verify(token, secret);
                return [4 /*yield*/, (0, user_data_1.readOne)(datas._id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.readUserFromToken = readUserFromToken;
