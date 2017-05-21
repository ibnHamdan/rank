const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const articleSchema = new mongoose.Schema({
    subject: {
        type: String,
        trim: true,
        required: ' Please enter an article name'
    },
    content: {
        type: String,
        trim: true,
        required: 'Article must have content'
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Article', articleSchema);