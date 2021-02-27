import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/server'

chai.should()
chai.use(chaiHttp)

describe('Login route API', () => {
    describe('GET /login', () => {
        it('It should return an object with a new user login message.', (done) => {
            chai.request(server)
                .get("/login")
                .end((error, res) => {
                    if (error) throw error;
                    res.should.have.status(200);
                    expect(res.body).to.deep.equal({"message": "Send a POST request to this route with a username and password to login."})
                    done()
                })
        })
    })
})