import passwordHash from 'password-hash';
import Auth from '../helpers/auth';
import helper from '../helpers';
import userModel from '../models/users';

const { generateToken, verifyToken } = Auth;

class UserController {
  /**
   *
   * @param {object} req - request
   * @param {object} res - response
   */
  static async createAccount(req, res) {
    try {
      const { first_Name, last_Name, email, phone_number, password, address } = req.body;
      const hashedpassword = passwordHash.generate(password);
      const values = [first_Name, last_Name, email, phone_number, address, hashedpassword ];
      const user = await userModel.create(values);
      if (user) {
        const { id, is_admin } = user;
        const token = await generateToken({ id, is_admin });
        return res.status(201).json({
          status: 201,
          data: [{ token, user }],
        });
      }
  } catch (err) {
    if (err.constraint === 'users_email_key') {
      return res.status(409).json({ error: true, message: 'User with this email already exists' });
    } if (err.constraint === 'users_phone_key') {
      return res.status(409).json({ error: true, message: 'User with this phone number already exit'});
    }
    return res.status(500).json({ error: true, message: 'Internal server error'});
  }
}

  /**
  *
  * @param {object} req - request
  * @param {object} res - response
  */
 static async loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (user) {
      if (passwordHash.verify(password, user.password)) {
        const { id, is_admin } = user;
        const token = await generateToken({ id, is_admin });
        return res.status(200).json({ data: [{ token, user }], message: 'Login successful' });
      }
      return res.status(401).json({ error: true, message: 'Invalid email or password' });
    }
    return res.status(401).json({ error: true, message: 'Invalid email or password' });
  } catch (err) {
    return res.status(500).json({ error: true, message: 'Internal Server error' });
  }

}

}

export default UserController;
