import express from "express";

export const app = express();

import routeExample from "./routes/example.route" ;
app.use(routeExample);

console.log('Hello world!');