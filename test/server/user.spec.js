const chai = require('chai'),
  chaiHttp = require('chai-http'),
  api = require('../../server');

// const User = require('../../server/models/user.js');
const expect = chai.expect;

chai.use(chaiHttp);
let token,
  newUser;
before(done => {

  chai.request(api)
    .post('/api/users')
    .send({
      username: 'Name',
      email: 'name@gmail.com',
      password: '1234',
    })
    .end((error, response) => {
      newUser = response.body;
      token = response.body.token;
      done();
    });
});

describe('POST', () => {
  it('/api/users: Creates a new user', done => {
    chai.request(api)
      .post('/api/users')
      .send({
        username: 'Star',
        email: 'star@gmail.com',
        password: '1234',
      })
      .end((error, response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.all.keys('message', 'token', 'user');
        done();
      });
  });

  it('/api/users/login: Logs a user in through authentication and returns token.', done => {
    chai.request(api)
      .post('/api/users/login')
      .send({
        username: 'Name',
        password: '1234',
      })
      .end((error, response) => {
        expect(token).to.exist;
        expect(response.status).to.equal(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.all.keys('message', 'token', 'user');
        done();
      });
  });
});

describe('UPDATE', () => {
  it('/users/<id>: Update user attributes.', done => {
    const userID = newUser.user_id;
    chai.request(api)
      .put('/users/' + userID)
      .set({ Authorization: 'Bearer ' + token })
      .send({
        username: 'change'
      })
      .end((error, response) => {
        expect(response).to.be.a('object');
        expect(response.status).to.equal(200);
        expect(response.body.username).to.equal('username');
        expect(response.body._id).to.equal(userID);
        done();
      });
  });
});

describe('VALIDATIONS', () => {
  it('Validates that the password is hashed', done => {
    expect(newUser.password).to.not.equal('1234');
    done();
  });

  it('Validates that the user created is unique', done => {
    chai.request(api)
      .post('/api/users')
      .send({
        username: 'Star',
        email: 'star@gmail.com',
        password: '1234',
      })
      .end((error, response) => {
        expect(response).to.be.a('object');
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Duplicate Entry');
        done();
      });
  });
});

describe('logout', () => {
  it('/users/logout: Logout a user.', done => {
    chai.request(api)
      .post('/users/logout')
      .end((error, response) => {
        expect(token).to.exist;
        expect(response.status).to.equal(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.not.have.property('token');
        done();
      });
  });
});