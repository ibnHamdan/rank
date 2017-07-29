const db = require('../config/db');


exports.registe = (req, res) => {
    res.render('registe');
}

exports.register = (req, res) => {
  res.render('login');
}

exports.login = (req, res) => {
    res.render('login');
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
 }

 exports.update = (req, res) => {
     res.render('account');
 }

 exports.updateAccount = (req, res) => {
     db.users.update(
         {
             name: req.body.name,
             email: req.body.email
         },
            {
                where: {id : req.user.id}
            }
     )
        res.redirect('back')
    
 }