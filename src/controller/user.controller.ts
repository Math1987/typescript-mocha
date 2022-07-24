import { Request, Response, NextFunction } from "express" ;
import { UserRequest, login as loginUserE, createUser as createUserE, readUserFromToken } from "../engine/user.engine" ;




export const create = ( req : Request, res : Response ) => {
    if ( req.body.email && req.body.password ){
        createUserE(req.body.email, req.body.password).then( user => {
            res.status(200).send(user) ;
        }).catch( err => {
            res.status(501).send(err);
        });
    }else{
        res.status(201).send({ error : 'Need at least email and password'});
    }
}
export const login = ( req : Request, res : Response ) => {
    if ( req.body.email && req.body.password ){
        loginUserE(req.body.email, req.body.password).then( user => {
            res.status(200).send(user) ;
        }).catch( err => {
            res.status(501).send(err);
        });
    }else{
        res.status(201).send({ error : 'Need at least email and password'});
    }
}
export const verifyAndAddUser = ( req : UserRequest, res : Response, next : NextFunction ) => {
    if ( req.headers.authorization ){
        readUserFromToken(req.headers.authorization).then( user => {
            req.user = user ;
            next();
        }).catch( err => {
            res.status(300).send({ error : "Authorization rejected" });
        });
    }else{
        res.status(300).send({ error : "Need authorization" });
    }
}
export const get = ( req : UserRequest, res : Response ) => {
    if ( req.user ){
        res.status(200).send(req.user);
    }else{
        res.status(300).send({ error : "Need authorization" });
    }
}
