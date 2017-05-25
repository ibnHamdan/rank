const db = require('../db');


exports.registe = (req, res) => {
    res.render('registe');
}

exports.register = (req, res) => {
    const author = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "creted": new Date()
    }
    db.connection.query('insert int authors set ?', req.body , )
}

exports.login = (req, res) => {
    res.render('login');
}