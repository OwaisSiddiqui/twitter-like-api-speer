import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/server'

chai.should()
chai.use(chaiHttp)

describe('Home route API', () => {
    describe('GET /', () => {
        it('It should return an object with a new user welcome message.', (done) => {
            chai.request(server)
                .get("/")
                .end((error, res) => {
                    if (error) throw error;
                    res.should.have.status(200);
                    expect(res.body).to.deep.equal({"message": "Welcome to Twitter! To signup, please go to the /signup route. If you already have an account, please go to the /login route."})
                    done()
                })
        })
    })
})