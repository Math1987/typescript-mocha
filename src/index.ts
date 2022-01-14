import { init as initDatas } from "./datas/index.data" ;
console.log('Hello world!');

initDatas();
import express from "express";

export const app = express();

import routeExample from "./routes/example.route" ;
app.use(routeExample);

console.log('Hello world!');
