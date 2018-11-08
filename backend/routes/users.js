const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/users', (req, res) => {
  User.find()
    .select('_id username password email')
    .exec()
    .then(user => {
      res.json(user);
    }).catch(err => res.status(500).json({ error: err }));
});

router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 12).then(password => {
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: password
    });
    user.save().then(() => {
      res.json({
        message: "Signed up successfully"
      });
    }).catch(err => {
      res.status(400).json({ error: err });
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({
    username: req.body.username
  }).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password)
      .then(result => {
        if (result) {
          const payload = {
            _id: user._id,
            username: user.username
          };
          jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d'},
          (err, token) => {
              res.json({
                token: token
          });
        });
      } else {
        res.status(422).json({ error: err });
      }
    }).catch(err => res.status(422).json({error: err}));
  }
});
});
module.exports = router;