import * as chai from 'chai';
//@ts-ignore
import * as chaiHttp from 'chai-http';
import app from '../../app';
import * as users from '../utils/user';
import { getToken } from '../utils/auth';

chai.use(chaiHttp);
chai.should();

describe('USER', () => {
  let token;
  let user;
  let newUser;

  before(async () => {
    user = await users.data({ role: 'admin' });
    await users.save(user);
    token = getToken(user);
    newUser = await users.data();
  });

  describe('Login /login', () => {
    it('should login', done => {
      chai
        .request(app)
        .post('/login')
        .send({
          username: user.username,
          password: user.password
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('GET  /api/user', () => {
    it('should get all users', done => {
      chai
        .request(app)
        .get('/api/user')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('POST /api/user', () => {
    it('should create a user', done => {
      chai
        .request(app)
        .post('/api/user')
        .set('Authorization', 'Bearer ' + token)
        .send(newUser)
        .end((err, res) => {          
          newUser = res.body;
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('PUT /api/user', () => {
    it('should update a user', done => {      
      chai
        .request(app)
        .put('/api/user')
        .set('Authorization', 'Bearer ' + token)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
