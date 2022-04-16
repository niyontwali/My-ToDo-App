const chai = require('chai');
const chaiHTTP = require('chai-http');
const {app} = require('../src/app');

chai.should();
chai.use(chaiHTTP);

describe('Home Page Test', () => {
  it('Should get the home page api', (done) => {
    chai
    .request(app)
    .get('/')
    .end((err, res) => {
       res.should.have.status(200);
       res.body.message.should.be.equal('Welcome to My To Do App');
       done();
    })
  });
});
