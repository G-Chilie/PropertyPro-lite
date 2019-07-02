import dotenv from 'dotenv';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import Helpers from '../helpers';
import Auth from '../helpers/auth';
import UserModel from '../models/users';

const SECRET = process.env.SECRET || 'SuperSecretTokenKeyXXX&*&';
const { verifyToken } = Auth;
const debugg = debug('authValidator');
const { extractErrors } = Helpers;
dotenv.config();

/* istanbul ignore next */
/**
 * @description Handles validation for all authentication processes
 */
class AuthValidator {
  /**
     * validates user sign up inputs
     * @param {object} req
     * @param {object} res
     * @param {callback} next
     */
  static validateSignUp(req, res, next) {
    req.check('firstname', 'First name is required').notEmpty().trim().isAlpha()
      .withMessage('First name can only contain alphabets');
    req.check('lastname', 'Last name is required').notEmpty().trim().isAlpha()
      .withMessage('Last name can only contain alphabets');
    req.check('email', 'Email is required').notEmpty().isEmail()
      .withMessage('Invalid email');
    req.check('phone', 'The phone number is required').notEmpty().trim()
      .isLength({ min: 11 })
      .withMessage('Enter a valid phone number');
    req.check('password', 'Password is required')
      .notEmpty().trim().isLength({ min: 6 })
      .withMessage('Password cannot be less then 6 characters');
    req.check('address', 'Address is required').notEmpty().trim();

    const errors = req.validationErrors();

    if (errors) {
      return res.status(400).json({
        errors: extractErrors(errors),
        status: 400,
      });
    }
    return next();
  }

  /**
  *
  * Checks if user already exist
  * @param {object} req - request
  * @param {object} res - response
  * @param {object} next - callback
  */

  static async userExists(req, res, next) {
    const { email } = req.body;
    try {
      const user = UserModel.find(usr => usr.email === email);
      if (user && user !== undefined) {
        return res.status(409).json({
          status: 409, error: `User with email ${email} already exists`,
        });
      }
    } catch (err) {
      debugg(err);
    }
    return next();
  }


  /**
  *
  * Validates user login inputs
  * @static
  * @param {object} req - request
  * @param {object} res - response
  * @param {object} next - callback
  * @returns
  */
  static validateLogin(req, res, next) {
    req.check('email', 'Email is required').notEmpty().isEmail().trim()
      .withMessage('Invalid email');
    req.check('password', 'Password is required').notEmpty().trim();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        errors: extractErrors(errors),
        status: 400,
      });
    }
    return next();
  }

  /**
   *
   * Validates authorization token
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @param {object} next - callback
   * @returns
   */
  static isTokenValid(req, res, next) {
    try {
      let authorization;
      if (req.headers.token) authorization = req.headers.token;
      else if (req.headers.authorization) authorization = req.headers.authorization.split(' ')[1];
      if (!authorization) {
        return res.status(401).json({ status: 401, error: 'You must log in to continue' });
      }
      jwt.verify(authorization, SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ status: 401, error: 'Invalid token, kindly log in to continue' });
        }
        const { id } = decoded;
        const user = UserModel.find(usr => usr.id === id);
        if (user) {
          req.body.tokenPayload = decoded;
          return next();
        }
        return res.status(401).json({ status: 401, error: 'User with the specified token does not exist' });
      });
    } catch (err) {
      return res.status(401).json({ status: 401, error: 'Internal server error, please try again' });
    }
  }

  /**
  *
  * Verifies agent
  * @static
  * @param {object} req - request
  * @param {object} res - response
  * @param {object} next - callback
  * @returns
  */

  static isAgent(req, res, next) {
    try {
      const authorization = req.headers.authorization.split(' ')[1] || req.headers.token;

      if (!authorization) {
        return res.status(401).json({ status: 401, message: 'Invalid token, kindly log in to continue' });
      }
      const verifiedToken = verifyToken(authorization);
      if (!verifiedToken.isAgent) {
        return res.status(401).json({ status: 401, message: 'Only an Agent can perform this task' });
      }
    } catch (err) {
      return res.status(401).json({ status: 500, message: 'Internal server error, please try again' });
    }
    return next();
  }
}

export default AuthValidator;
