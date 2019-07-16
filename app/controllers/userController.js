import passwordHash from 'password-hash';
import Auth from '../helpers/auth';
import userModel from '../models/users';

const { generateToken } = Auth;

class UserController {
  /**
   *
   * @param {object} req - request
   * @param {object} res - response
   */
  static async createAccount(req, res) {
    try {
      const { first_name, last_name, email, password, phone_number, address} = req.body;
      const hashedpassword = passwordHash.generate(password);
      const values = [first_name, last_name, email, hashedpassword, phone_number, address ];
      const user = await userModel.create(values);
      if (user) {
        const { id, is_admin } = user;
        const token = await generateToken({ id, is_admin });
        return res.status(201).json({
          status: 'success',
          data: { token, ...user },
        });
      }
  } catch (err) {
    if (err.constraint === 'users_email_key') {
      return res.status(409).json({ status: 'error', error: 'User with this email already exists' });
    } if (err.constraint === 'users_phone_number_key') {
      return res.status(409).json({ status: 'error', error: 'User with this phone number already exit'});
    }
    return res.status(500).json({ status: 'error', error: 'Internal server error'});
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
        return res.status(200).json({ status: 'success', data: { token, ...user } });
      }
      return res.status(401).json({ status: 'error', error: 'Invalid email or password' });
    }
    return res.status(401).json({ status: 'error', error: 'Invalid email or password' });
  } catch (err) {
    return res.status(500).json({ status: 'error', error: 'Internal Server error' });
  }

}

}

export default UserController;
