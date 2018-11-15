var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'routine'
});

const getRoutine = function(data, callback) {
  var day = data;
  connection.query(`select * from ${day};`, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

const saveRoutine = function(input, callback) {
  var day = '';
  var exercises = '';
  connection.query(`insert into ${day} () values ();`, function (err, data) {
    if (err) {
      callback(err, null);
    }
  });
}


module.exports.saveRoutine = saveRoutine;
module.exports.getRoutine = getRoutine;
