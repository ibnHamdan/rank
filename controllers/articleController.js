const db = require('../db');


exports.index = (req, res) => {
    res.render('index');
}

exports.add = (req, res) => {
    res.render('add');
}

exports.addArticle =  (req, res) => {
    db.connection.connect();
    db.connection.query('insert into articles set ?', req.body, function(err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result)
    })
    res.redirect('/');
}

exports.getArticle = /*async*/(req, res) => {
    //const articlePromise = Article.find();
    //const countPromise = Article.count();

    //const [articles , count] = await Promise.all([articlePromise, countPromise]);
    

    res.render('index')
}
