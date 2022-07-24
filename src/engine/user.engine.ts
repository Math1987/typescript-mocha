import { Request } from "express" ;
import { updateOne as updateUser,  readOne as readUserById, readOneByEmail as readUserByEmail, create as createUserD } from "../datas/user.data" ;
import bcrypt from 'bcrypt' ;
import jwt from "jsonwebtoken" ;
const saltRounds = 10;
const secret = "ChooseASecretYouAreTheOnlyOneToReadyKnow.7654123456!!"

export interface UserRequest extends Request {
    user : any ;
}

export const createUser = ( email : string, password : string ) => {
    return new Promise((resolve, reject) => {

        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            if ( hash ){                
                createUserD({ email, password : hash}).then( async u => {
                    let user = await createToken( u!._id.toString() );    
                    resolve(user);
                }).catch( err => {
                    reject(err);
                });
            }else {
                reject(err);
            }
        });
        
    });
}
export const login = ( email : string, password : string ) => {
    return new Promise( async (resolve, reject) => {

        let user = await readUserByEmail( email ) ;  
        bcrypt.compare(password, user!.password, async function(err, result) {
            if ( result ){
                user = await createToken( user!._id.toString() );                
                resolve(user);
            }else{
                reject(err);
            }
        });
        
    });
}
export const createToken = async ( userId : string ) => {
    const token = jwt.sign(JSON.stringify({ _id : userId }), secret ) ;
    return await updateUser( userId, {token} );
}
export const readUserFromToken = async ( token : string ) => {
    const datas = jwt.verify(token, secret );
    return await readUserById( (datas as any)!._id );
}