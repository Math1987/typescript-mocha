import mongoose, { ObjectId } from "mongoose" ;
let db = null ;

export type type = {
    email : string,
    password : string,
    token? : string,
};
export type typeInDB = type & {
    _id : ObjectId 
}

export const schema = new mongoose.Schema({
    email : { type : String, index : true, unique : true},
    password : { type : String, required : true},
    token : { type : String, required : false}
});
let model : mongoose.Model<type> ;

export const init = ( db_: mongoose.Connection ) => {
    db = db_ ;
    model = db.model('user', schema);
}
export const create = async ( datas : type ) : Promise<typeInDB> => {
    return await new model(datas).save();
}
export const readOne = async ( _id : ObjectId ) : Promise<typeInDB | null>  => {
    return await model.findOne({ _id }) ;
}
export const readOneByEmail = async ( email : string ) : Promise<typeInDB | null>  => {
    return await model.findOne({ email }) ;
}
export const updateOne = async ( _id : string, datas : any ) : Promise<typeInDB | null>  => {
    return await model.findOneAndUpdate({ _id }, datas, { returnOriginal : false } ) ;
}