var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_saladinp',
  password        : '2701',
  database        : 'cs340_saladinp'
});
module.exports.pool = pool;