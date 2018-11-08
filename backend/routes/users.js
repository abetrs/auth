const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

function loggednIn() {
  const authHeader = req.get('authorization');
  if (authHeader) {
    token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {
        if (err) {
          next(error);
        }
      })
    } else {
      next(error);
    }
  }
}

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
      password: password,
      posts: []
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

router.get('/posts', (req, res, next) => {
  const token = req.get('authorization').split(' ')[1];
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = decoded.username;
  if (user) {
    User.find({ username: user })
    .select('posts')
    .exec()
    .then(posts => {
      res.json(posts);
    }).catch(err => res.status(500).json({error: "Internal server error"}));
  } else {
    res.status(422).json({error: "Unauthorized"});
  }
});
router.put('/posts', (req, res, next) => {
  const token = req.get('authorization').split(' ')[1];
  const post = req.body.post;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = decoded.username;
  if (user) {
    User.findOne({ username: user }).exec()
    .then(fUser => {
      const newPosts = [post, ...fUser.posts];
      User.update({username: user}, {$set: { posts: [...newPosts] }});
      res.json({newPosts})
    }).catch(err => res.status(500).json({error: "Internal Server Error"}))
  }
})
module.exports = router;