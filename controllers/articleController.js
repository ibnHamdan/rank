const models = require('../models');
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
    res.render('index');
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


exports.addArticle =   (req, res) => {
    models.Article.create({
        title: req.body.title,
        author: req.body.author,
        photo: req.body.photo,
        content: req.body.content
    });
    res.redirect('/');
}

exports.getArticle = (req, res) => {
    // models.Article.findAll({}).then(function(articles){
    //     res.render('index', {articles});
    // });
   
    res.render('index');
}
