const Sequelize = require('sequelize');
const path = require('path');
const env = require(path.join(__dirname,'env.json'))["development"];
const sequelize = new Sequelize(env.database, env.username, env.password, {
  dialect: env.dialect,
  host: env.host
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/users.js')(sequelize, Sequelize);
db.posts = require('../models/posts')(sequelize, Sequelize);
db.comments = require('../models/comments')(sequelize, Sequelize);

//Relations
db.comments.belongsTo(db.posts);
db.posts.hasMany(db.comments);
db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);


module.exports =db;