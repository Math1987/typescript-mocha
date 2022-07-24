import { expect } from "chai" ;
import { app } from "../../src/index" ;
import request from "supertest" ;

describe('route example', () => {

    it("createUser: should return a user", done => {
        request(app)
        .post('/u/create')
        .send({ email : "albert@test.com", password : "1234"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end( ( err, res) => {
            expect(res.statusCode).equal(200) ;
            expect(res.body.email).equal("albert@test.com");
            done();
        });
    })

    let token = "" ;

    it("loginUser: should return a user", done => {
        request(app)
        .post('/u/login')
        .send({ email : "albert@test.com", password : "1234"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end( ( err, res) => {
            expect(res.statusCode).equal(200) ;
            expect(res.body.email).equal("albert@test.com");
            expect(res.body.token.length > 10).equal(true);
            token = res.body.token ;
            done();
        });
    });
    it("getUser: should return a user", done => {
        request(app)
        .get('/u/get')
        .set({ 'authorization': token, Accept: 'application/json' })
        .end( ( err, res) => {
            expect(res.statusCode).equal(200) ;
            expect(res.body.email).equal("albert@test.com");
            done();
        });
    })

});