import { Request, Response, NextFunction } from "express" ;
import { UserRequest, login as loginUserE, createUser as createUserE, readUserFromToken } from "../engine/user.engine" ;
import { updateOne as updateUserD } from "../datas/user.data" ;

export const create = ( req : Request, res : Response ) => {
    if ( req.body.email && req.body.password ){
        console.log('create account', req.body)
        createUserE(req.body).then( user => {
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

    console.log('authorization check');

    console.log('authorization token', req.headers.authorization)

    if ( req.headers.authorization ){
        readUserFromToken(req.headers.authorization).then( user => {
            req.user = user ;
            next();
        }).catch( err => {
            res.status(401).send({ error : "Authorization rejected" });
        });
    }else{
        res.status(401).send({ error : "Need authorization!" });
    }
}
export const get = ( req : UserRequest, res : Response ) => {
    if ( req.user ){
        res.status(200).send(req.user);
    }else{
        res.status(401).send({ error : "Need authorization!" });
    }
}
export const update = ( req : UserRequest, res : Response ) => {
    console.log('update', req.user, req.body );
    if ( req.user ){
        updateUserD(req.user._id, req.body ).then( nu => {
            res.status(200).send(nu);
        }).catch( err => {
            res.status(401).send({ error : "update fail"})
        })
    }else{
        res.status(401).send({ error : "Need authorization!" });
    }
}
