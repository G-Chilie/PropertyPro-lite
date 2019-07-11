import chai from 'chai';
import chaiHTTP from 'chai-http';
import passwordHash from 'password-hash';
import Helpers from '../helpers/auth'
import app from '../app';

const { generateToken } = Helpers

chai.use(chaiHTTP);
const { expect } = chai;
const baseUrl = '/api/v1/auth';
const Hashedpassword = passwordHash.generate('password');
describe('Authentication endpoints', function () {
  this.timeout(0);
  describe('Sign up', () => {
    const defaultUser = {
      first_name: 'Lorem',
      last_name: 'Ipsum',
      email: 'lorem@gmail.com',
      phoneNumber: '08087765646',
      password: Hashedpassword,
      address: '123 Gate av, New York, USA',
    };
    it('It should ensure that first name is not empty', (done) => {
      const newUser = { ...defaultUser, first_name: '' };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql('First name is required');
            expect(res.body.errors[1]).to.eql('First name can only contain alphabets');
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should ensure that last name is not empty', (done) => {
      const newUser = { ...defaultUser, last_name: '' };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql('Last name is required');
            expect(res.body.errors[1]).to.eql('Last name can only contain alphabets');
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should ensure that email is not empty', (done) => {
      const newUser = { ...defaultUser, email: '' };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql('Email is required');
            expect(res.body.errors[1]).to.eql('Invalid email');
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should ensure that email is a valid one', (done) => {
      const newUser = { ...defaultUser, email: 'loremIpsum.com' };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql('Invalid email');
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should ensure that phone number is not empty', (done) => {
      const newUser = { ...defaultUser, phoneNumber: '' };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql('The phone number is required');
            expect(res.body.errors[1]).to.eql('Enter a valid phone number');
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should ensure that phone number is not less than 11 characters', (done) => {
      const newUser = { ...defaultUser, phoneNumber: '0908775675' };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql('Enter a valid phone number');
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should ensure that password is not empty', (done) => {
      const newUser = { ...defaultUser, password: '' };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql('Password is required');
            expect(res.body.errors[1]).to.eql('Password cannot be less then 6 characters');
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should ensure that password is not not less than 6 characters', (done) => {
      const newUser = { ...defaultUser, password: '12345' };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql('Password cannot be less then 6 characters');
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should ensure that address is not empty', (done) => {
      const newUser = { ...defaultUser, address: '' };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql('Address is required');
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should return a user exist error', (done) => {
      const email = 'kingsley.admin@gmail.com';
      const newUser = { ...defaultUser, email };
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(newUser)
          .end((err, res) => {
            expect(res).to.have.status(409);
            expect(res.body.error).to.eql(`User with email ${email} already exists`);
            done();
          });
      } catch (err) {
        throw err;
      }
    });
    it('It should successfully signup user', (done) => {
      try {
        chai.request(app)
          .post(`${baseUrl}/signup`)
          .send(defaultUser)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data).to.have.length(1);
            done();
          });
      } catch (err) {
        throw err;
      }
    });
  });
});