const mongoose = require('mongoose');
const Article = mongoose.model('Article');


exports.index = (req, res) => {
    res.render('index');
}

exports.add = (req, res) => {
    res.render('add');
}

exports.addArticle = async (req, res) => {
    (await (new Article(req.body)).save());
    res.redirect('/');
}

exports.getArticle = async(req, res) => {
    const articlePromise = Article.find();
    const countPromise = Article.count();

    const [articles , count] = await Promise.all([articlePromise, countPromise]);
    

    res.render('index', {articles, count})
}