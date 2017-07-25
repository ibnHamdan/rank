//const models = require('../models');


exports.registe = (req, res) => {
    res.render('registe');
}

exports.register = (req, res) => {
  res.render('login')
}

exports.login = (req, res) => {
    res.render('/');
}

exports.logout = (req, res) => {
    req.session.dstroy(function(err) {
        res.redirect('/');
    });
}