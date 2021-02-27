import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/server'

chai.should()
chai.use(chaiHttp)

describe('Logout route API', () => {
    describe('GET /logout', () => {
        it('It should return an object with a new user logout message.', (done) => {
            chai.request(server)
                .get("/logout")
                .end((error, res) => {
                    if (error) throw error;
                    res.should.have.status(200);
                    expect(res.body).to.deep.equal({"message": "Welcome to Twitter! To signup, please go to the /signup route. If you already have an account, please go to the /login route."})
                    done()
                })
        })
    })
})