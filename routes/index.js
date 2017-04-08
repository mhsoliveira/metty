var express = require('express');
var router = express.Router();
var User = require('../models/users');
var mongoose = require('mongoose');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/crowdfundig', function(req, res, next) {
  User.find({"type": "driver"}, function (err, docs) {
      res.render('crowdfundig', {opt: docs, user : req.user} );
  });
});

router.put('/invest', function(req, res, next) {
  User.findById(req.body.target, function (err, docs) {
    if (err)
      res.send(err);
    docs.funds+=req.body.support
    docs.contribuintes.push(req.body.user)
    docs.save(function(err) {
      if (err)
        res.send(err);
    })
  });
  User.findById(req.body.user, function (err, data) {
    if (err)
      res.send(err);
    data.funds+=req.body.support
    data.save(function(err) {
      if (err)
        res.send(err);
    })
  });
  res.json({message:"Done"})
});

router.get('/crowdfundig/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, docs) {
      res.render('pledge', {Idea: docs, user : req.user} );
  });
});

router.post('/register', (req, res, next) => {
      User.register(new User({ username : req.body.username, email : req.body.email, debt: req.body.debt, funds: 0, type: req.body.type, picture: req.body.picture, matricula: req.body.matricula }), req.body.password, (err, User) => {
        if (err) {
          return res.render('register', { message : err });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.json({user:req.user, message: 'User Registered'});
            });
        });
    });

});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/crowdfundig');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
