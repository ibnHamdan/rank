const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/post/:id', postController.getPost);

router.get('/', postController.getArticle, postController.index);
router.get('/add',isLoggedIn, postController.add);
router.post('/add', postController.upload, postController.resize, postController.addArticle);



router.get('/registe', userController.registe);
router.post('/registe', passport.authenticate('local-registe', {
  successRedirect: '/login',
  failureRedirect: '/registe'
}));
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/add',
  failureRedirect: '/login'
}));

router.get('/login', userController.login);

router.get('/account', userController.update);
router.post('/account',postController.upload, postController.resize, userController.updateAccount);

router.get('/logout', userController.logout)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');

}

module.exports = router;