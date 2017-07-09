const mysql = require('mysql');

// exports.pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "a0540002507",
//     database: "rank"
// });

exports.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1412",
    database: "rank"
});