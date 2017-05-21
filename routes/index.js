const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');


router.get('/',  articleController.getArticle, articleController.index);
router.get('/add', articleController.add);
router.post('/add', articleController.addArticle);


module.exports = router;