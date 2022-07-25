"use strict";
exports.__esModule = true;
var environment = {
    mode: "dev",
    db: "mongodb://localhost:27017/myLocalDb"
};
if (process.env.MODE === "prod") {
    environment.mode = "prod";
    environment.db = "mongodb+srv://User:Password@cluster.any.mongodb.net/mydb?retryWrites=true&w=majority";
}
exports["default"] = environment;
