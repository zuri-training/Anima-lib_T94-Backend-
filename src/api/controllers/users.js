const User = require('../../db/models/User');
const { makeToken } = require('../config/auth');

// Retrieve all existing users
// exports.findAll = (req, res) => {
//     User.findAll()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// };

// Register
exports.register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  User.findOne({ email }).then(existingUser => {
      if(existingUser) {
          return res.status(409).json({ message: 'problem signing up', code: 'USEREXISTS' });
      } else {
          const user = new User({ firstName, lastName, email, password });
          user.save().then(user => {
              const token = makeToken(user);
              res.status(201).json({ token, user: { _id: user._id, email: user.email }  });
          })
          .catch(err => {
              res.status(500).json(err);
          })
      }
  })
};

// Login
exports.login = (req, res) => {
  if(!req.user) {
    return res.status(422);
  }
  res.status(200).json({ token: makeToken(req.user), user: req.user })
}