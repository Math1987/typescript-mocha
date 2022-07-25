import { init as initDatas } from "./datas/index.data" ;
import bodyParser from "body-parser" ;
import cors from "cors" ;
import morgan from "morgan" ;
import environment from "./environment" ;

initDatas();
import express from "express";

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const corsOptions : cors.CorsOptions = {
//     origin : environment.origins,
// }
app.use(cors());
app.use(morgan("tiny"));

import routeExample from "./routes/example.route" ;
import userRoute from "./routes/user.route" ;

app.use('', (req, res, next) => {
    console.log('api called')
    next();
})

app.get('', (req, res) => res.status(200).send('Welcome!'));
app.use(routeExample);
app.use("/u",userRoute);

console.log('running in ' + process.env.MODE + " mode");
if (  process.env.MODE === "dev" ){
    console.log('listening on port 17000');
    app.listen(17000) ;
}