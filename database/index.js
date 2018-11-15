var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'routine'
});

const saveRoutine = function(input, callback) {
  var day = '';
  var exercises = '';
  connection.query(`insert into ${day} () values ();`, function (err, data) {
    if (err) {
      callback(err, null);
    }
  });
}

const getRoutine = function(callback) {
  connection.query(`select * from monday;`, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}


module.exports.saveRoutine = saveRoutine;
module.exports.getRoutine = getRoutine;
