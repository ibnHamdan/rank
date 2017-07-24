const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authorController = require('../controllers/authorController');


router.get('/',  articleController.getArticle, articleController.index);
router.get('/add', articleController.add);
router.post('/add', articleController.upload, articleController.resize, articleController.addArticle);

// router.get('/registe', authorController.registe);
// router.post('/registe', authorController.register);
// router.get('/login', authorController.login);


module.exports = router;