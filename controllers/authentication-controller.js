require('dotenv').config();
const Models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = {
  login: async (req, res) => {
    let user = {};
    console.log(req.body);
    try {
      user = await Models.User.findOne({
        where: { email: req.body.email },
      });

      const validated = await bcrypt.compare(req.body.password, user.password);
      const accessToken = await jwt.sign({ id: user.id }, process.env.ACCESS_KEY_SECRET);
      const refreshToken = await jwt.sign({ id: user.id }, process.env.REFRESH_KEY_SECRET);
      const { id, username } = await user.dataValues;
      // const { password, createdAt, updatedAt, ...rest } = await user.dataValues;

      if (!validated) res.json({ status: false, message: 'Invalid credentials' });

      if (validated) {
        res.cookie('token', refreshToken, { httpOnly: true });
        res.setHeader('authorization', `Bearer ${accessToken}`);
        res.json({ user: { id, username }, token: true });
        // res.json({ user: rest, token: true });
      }

      console.log('successful');
    } catch (error) {
      if (!user) res.json({ status: false, message: 'User does not exists' });
      console.log(error);
    }
  },
  register: async (req, res) => {
    console.log(req.body);

    let user = {};

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
      console.log(req.body.address);
      user = await Models.User.create({
        username: req.body.email.split('@')[0],
        password: hashedPassword,
        email: req.body.email,
      });

      const accessToken = await jwt.sign({ id: user.id }, process.env.ACCESS_KEY_SECRET);
      // const refreshToken = randtoken.uid(256);
      const refreshToken = await jwt.sign({ id: user.id }, process.env.REFRESH_KEY_SECRET);

      if (user) {
        res.cookie('refresh_token_', refreshToken, { httpOnly: true });
        res.setHeader('authorization', `Bearer ${accessToken}`);
        res.json({ user, token: true });
      }

      res.json({ user });
    } catch (error) {
      console.log(error);
    }
  },
  changePassword: async (req, res) => {
    console.log(req.body);
    let user = {};
    let validated = '';

    // {id: '', currentPassword: '', newPassword: ' ', confirmPassword: ''}

    try {
      console.log('inside try');
      user = await Models.User.findOne({ where: { id: req.body.id } });

      validated = await bcrypt.compare(req.body.currentPassword, user.password);

      if (!validated) res.json({ status: false, message: 'Invalid current password' });

      if (validated) {
        const hashedNewPassword = await bcrypt.hash(req.body.confirmPassword, 10);

        try {
          await Models.User.update(
            { password: hashedNewPassword },
            {
              where: { id: user.id },
            },
          );

          res.json({ status: true, message: 'Password has been updated' });
        } catch (error) {
          console.error();
        }
      }
    } catch {
      console.error();
    }
  },
};

module.exports = user;
