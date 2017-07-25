const fs = require('fs');
const path = require('path');
const sequlize = require('sequelize');
const config = require(path.join(__dirname, '..','config.json'))["development"];


const connection = new sequlize(config.database, config.username, config.password, config);

const db = {};

fs.readdirSync(__dirname).filter(function(file){
  return (file.indexOf(".") !== 0 ) && (file !== "index.js");
})
.forEach(function(file) {
  const model = connection.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if('associate'in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.connection = connection;
db.sequlize = sequlize;

module.exports =db;