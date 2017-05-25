const db = require('../db');


exports.index = (req, res) => {
    res.render('index');
}

exports.add = (req, res) => {
    res.render('add');
}

exports.addArticle =   (req, res) => {
    db.connection.query('insert into articles set ?', req.body, function(err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
    })
    res.redirect('/');
}

exports.getArticle = (req, res) => {
    db.connection.query('select * from articles', function(err, result) {
         res.render('index', {result});
    });
   
    //res.render('index');
}
