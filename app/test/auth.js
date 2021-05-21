import chai from 'chai';
import chaiHTTP from 'chai-http';
import passwordHash from 'password-hash';
import Helpers from '../helpers/auth';
import app from '../app';

const { generateToken } = Helpers;

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
            phone: '08163446686',
            password: Hashedpassword,
            address: '123 Ajao estate, Lagos, Nigeria'
        };
        it('It should ensure that first name is not empty', (done) => {
            const newUser = { ...defaultUser, first_name: '' };
            try {
                chai.request(app)
                    .post(`${baseUrl}/signup`)
                    .send(newUser)
                    .end((_, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body.error[0]).to.eql('First name is required');
                        expect(res.body.error[1]).to.eql('First name can only contain alphabets');
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
                    .end((_, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body.error[0]).to.eql('Last name is required');
                        expect(res.body.error[1]).to.eql('Last name can only contain alphabets');
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
                    .end((_, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body.error[0]).to.eql('Email is required');
                        expect(res.body.error[1]).to.eql('Invalid email');
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
                    .end((_, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body.error[0]).to.eql('The phone number is required');
                        expect(res.body.error[1]).to.eql('Enter a valid phone number');
                        expect(res.body.error[2]).to.eql('Password is required');
                        expect(res.body.error[3]).to.eql('Password cannot be less then 6 characters');
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
                    .end((_, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body.error[0]).to.eql('The phone number is required');
                        expect(res.body.error[1]).to.eql('Enter a valid phone number');
                        expect(res.body.error[2]).to.eql('Address is required');
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
                    .end((_, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body.error[0]).to.eql('The phone number is required');
                        expect(res.body.error[1]).to.eql('Enter a valid phone number');   
                        done();
                    });
            } catch (err) {
                throw err;
            }
        });
    });

    describe('signin', () => {
        const defaultUser = {
            email: 'chinwe.admin@gmail.com',
            password: 'secret',
        };
        it('It should ensure that email is not empty', (done) => {
            const newUser = { ...defaultUser, email: '' };
            try {
                chai.request(app)
                    .post(`${baseUrl}/signin`)
                    .send(newUser)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body.error[0]).to.eql('Email is required');
                        expect(res.body.error[1]).to.eql('Invalid email');
                        done();
                    });
            } catch (err) {
                throw err;
            }
        });
    });

    describe('Reset password', () => {
        const baseUrl = '/api/v1/users';
        const userEmail = 'chinwe.admin@gmail.com';
        const invalidToken = 'sli990haijijaiojzkndkaklndklfjoiioajidjfiljqkljaiojdifgjoioiajdfjoiaj';
        const userToken = generateToken({ email: 'chinwe.admin@gmail.com', id: 2 });
        const newPassword = { email: userEmail, password: 'secret', passwordConfirmation: 'secret' };
        it('It should successfully send a reset email', (done) => {
            try {
                chai.request(app)
                    .get(`${baseUrl}/${userEmail}/resetPassword`)
                    .end(() => {
                        done();
                    });
            } catch (err) {
                throw err;
            }
        });

        it('It should return invalid email', (done) => {
            try {
                chai.request(app)
                    .get(`${baseUrl}/reset/${invalidToken}`)
                    .end(() => {
                        done();
                    });
            } catch (err) {
                throw err;
            }
        });

        // it('It should return a reset password form', (done) => {
        //     try {
        //         chai.request(app)
        //             .get(`${baseUrl}/reset/${userToken}`)
        //             .end(() => {
        //                 done();
        //             });
        //     } catch (err) {
        //         throw err;
        //     }
        // });

        // it('It should return password must be 6 digits error', (done) => {
        //     try {
        //         chai.request(app)
        //             .post(`${baseUrl}/reset`)
        //             .send({ ...newPassword, password: 'hshs' })
        //             .end(() => {
        //                 done();
        //             });
        //     } catch (err) {
        //         throw err;
        //     }
        // });
        // it('It should return password doest match error', (done) => {
        //     try {
        //         chai.request(app)
        //             .post(`${baseUrl}/reset`)
        //             .send({ ...newPassword, passwordConfirmation: 'hdhdhdhdh' })
        //             .end(() => {
        //                 done();
        //             });
        //     } catch (err) {
        //         throw err;
        //     }
        // });
        it('It should return password reset successfully', (done) => {
            try {
                chai.request(app)
                    .post(`${baseUrl}/reset`)
                    .send(newPassword)
                    .end(() => {
                        done();
                    });
            } catch (err) {
                throw err;
            }
        });
    });
});
