import { MongoServerError } from "mongodb"; 
import { expect } from "chai" ;
import { ObjectId } from "mongoose";
import { type as typeExample, typeInDB as typeInDbExample, create as createUser, readOne as readOneExample } from "../../src/datas/user.data" ;


describe('user data', () => {

    let id_ : ObjectId ;
    it("createUser and readOneUser: should return user datas.", async () => {

        const user = await createUser({email : "user@myDomain.com", password : "MyPassword"});
        expect(user.email).equal("user@myDomain.com");
        expect(user._id).exist ;
        const exampleReaded = await readOneExample(user._id) as typeInDbExample ;
        expect(exampleReaded._id.toString()).equal(user._id.toString());
        expect(exampleReaded.email).equal("user@myDomain.com");

    });
    it("createExample doublon: should fail with code 11000", async () => {
        try{
            await createUser({email : "user@myDomain.com", password : "MyPassword"});
        }catch( e ){
            expect((e as MongoServerError).code).equal(11000);
        }
    });

});