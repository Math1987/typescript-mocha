import { init as initDatas } from "./datas/index.data" ;
import bodyParser from "body-parser" ;

initDatas();
import express from "express";

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import routeExample from "./routes/example.route" ;
import userRoute from "./routes/user.route" ;

app.use(routeExample);
app.use("/u",userRoute);


if (  process.env.MODE === "dev" ){
    app.listen(17000) ;
}