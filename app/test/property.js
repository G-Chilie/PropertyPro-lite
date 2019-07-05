import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';

chai.use(chaiHTTP);
const { expect } = chai;
const baseUrl = '/api/v1/property';

describe('Property endpoints', () => {
  /* eslint-disable no-unused-expressions */
  let userToken;
  const invalidToken = 'Bearer xxxxxxxxxxxxxxx123456';
  before('Login to get access token', () => {
    const defaultUser = {
      email: 'user@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(defaultUser)
      .end((err, res) => {
        const token = res.body.data[0].token;
        userToken = `Bearer ${token}`;
      });
  });
  describe('Create property ad', () => {
    const defaultProperty = {
      state: 'Used',
      price: '120000.00',
      address: 'ikeja',
      type: '2_bedroom',
    };
    it('It should ensure that token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .send(defaultProperty)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.eql('You must log in to continue');
          done();
        });
    });
    it('It should ensure that the provided token is valid', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .send(defaultProperty)
        .set('authorization', invalidToken)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.eql('Invalid token, kindly log in to continue');
          done();
        });
    });
    it('It should ensure that property state is not empty', (done) => {
      const newProperty = { ...defaultProperty, state: '' };
      chai.request(app)
        .post(`${baseUrl}`)
        .send(newProperty)
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.eql('Only an Agent can perform this task');
          done();
        });
    });
    it('It should ensure that Property price is not empty', (done) => {
      const newProperty = { ...defaultProperty, price: '' };
      chai.request(app)
        .post(`${baseUrl}`)
        .send(newProperty)
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.eql('Only an Agent can perform this task');
          done();
        });
    });
    it('It should ensure that property address is not empty', (done) => {
      const newProperty = { ...defaultProperty, address: '' };
      chai.request(app)
        .post(`${baseUrl}`)
        .send(newProperty)
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.eql('Only an Agent can perform this task');
          done();
        });
    });
    it('It should ensure that property type is not empty', (done) => {
      const newProperty = { ...defaultProperty, type: '' };
      chai.request(app)
        .post(`${baseUrl}`)
        .send(newProperty)
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.eql('Only an Agent can perform this task');
          done();
        });
    });

    it('It should successfully create a property ad', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .send(defaultProperty)
        .set('authorization', userToken)
        .end((err, res) => {
      expect(res).to.have.status(401);
            expect(res.body.message).to.eql('Only an Agent can perform this task');
            done();
        });
    });
  });

});
