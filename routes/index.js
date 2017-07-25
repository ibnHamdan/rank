const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authorController = require('../controllers/authorController');
const passport = require('passport');

router.get('/', articleController.getArticle, articleController.index);
router.get('/add',isLoggedIn, articleController.add);
router.post('/add', articleController.upload, articleController.resize, articleController.addArticle);

router.get('/registe', authorController.registe);
router.post('/registe', passport.authenticate('local-registe', {
  successRedirect: '/login',
  failureRedirect: '/registe'
}));
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/add',
  failureRedirect: '/login'
}));

router.get('/login', authorController.login);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
 
}

module.exports = router;