const db = require('../config/db');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto){
        next(null, true)
        } else {
            next({message: ' that filetype isn\t allowed:'}, false)
        }
    }
}


exports.index = (req, res) => {
    res.render('index', {title: 'RANK'});
}

exports.add = (req, res) => {
    res.render('add');
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    if( !req.file){
        next();
        return;
    }
    const extention = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extention}`;
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    next();

}


exports.addArticle =   async (req, res) => {
    await db.posts.create({
        title: req.body.title,
        user_id : req.user.id,
        photo: req.body.photo,
        content: req.body.content
    });
    res.redirect('/');
}


exports.getArticle = (req, res) => {
    db.posts.findAll({}).then(function(posts){
        res.render('index', {posts});
    });
}
// exports.getArticle = (req, res) => {
//     db.posts.findAll().then(post => {
//       const resObj = post.map(post => {
//         //tidy up the user data
//         return Object.assign(
//           {},
//           {
//            post_id: post.id,
//            user_id: post.user_id,
//            title: post.title,
//            content: post.content
//           }
//         )
//       });
//     //res.json(resObj)
//     res.render('index', { resObj } );
//     });
//   };