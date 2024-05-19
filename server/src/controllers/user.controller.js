import passport from 'passport';
import UserRepository from '../models/user/user.repository.js';

const UserController = {
  async createUser(req, res, next) {
    try {
      const newUser = await UserRepository.createUser(req.body);
      if (!newUser?.success) {
        return res.status(409).json(newUser);
      }
      const { _id, firstName, lastName, email, phoneNumber, role } = newUser;
      res.status(201).json({
        success: true,
        data: { _id, firstName, lastName, email, phoneNumber, role },
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      if (!user) {
        return res.status(401).json({ success: false, error: info.message });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ success: false, error: err.message });
        }
        // If login is successful, user data is stored in req.user
        const { _id, firstName, lastName, email, phoneNumber, role } = user;
        return res.json({
          success: true,
          message: 'Login successful',
          data: { _id, firstName, lastName, email, phoneNumber, role },
        });
      });
    })(req, res, next);
  },
  logout(req, res) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, error: 'Failed to logout' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.json({ success: true, message: 'Logout successful' });
      });
    });
  },
};

export default UserController;
