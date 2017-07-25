module.exports = function(connection, DataTypes) {
  const Article = connection.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    photo: DataTypes.STRING,
    content: DataTypes.STRING,
  });

  return Article;
}

function generatMyID() {
  let id = 0;
  id ++;
  return id;
}