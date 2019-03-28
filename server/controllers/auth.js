// modules
const jwt = require('jwt-simple');

// models
const User = require('../models/user.js');

// config
const { TOKEN_SECRET } = require('../config');

exports.register = async (req, res) => {
  const { userName, password } = req.body;

  if (userName && password) {
    const userData = {
      userName,
      password
    };

    try {
      const user = await User.findOne({ userName });

      if (!user) {
        User.create(userData, (err, user) => {
          if (err) {
            res.json(err);
          } else {
            const token = jwt.encode(user.userName, TOKEN_SECRET);
            const resData = {
              userName: user.userName,
              token
            };
            res.json({ data: resData });
          }
        });
      } else {
        res.setHeaders({ status: 409 });
        res.status(401).json({ error: 'User already exist' });
      }
    } catch (err) {
      res.json(err);
    }
  }
};

exports.user = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userName = jwt.decode(token, TOKEN_SECRET);

  try {
    const user = await User.findOne({ userName });
    const token = jwt.encode(user.userName, TOKEN_SECRET);
    const data = {
      userName: user.userName,
      token
    };

    res.json({ data });
  } catch (err) {
    res.json(err);
  }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName }, 'userName password');

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    }

    user.comparePassword(password, (_, isMatch) => {
      if (isMatch) {
        const token = jwt.encode(user.userName, TOKEN_SECRET);
        const data = {
          userName: user.userName,
          token
        };

        res.json({ data });
      } else {
        res.json({ error: 'Invalid Password' });
      }
    });
  } catch (err) {
    res.json(err);
  }
};
