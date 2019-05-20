var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "routine"
});

const getRoutine = (data, callback) => {
  var day = data;
  connection.query(`select * from ${day};`, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const addExercise = input => {
  connection.query(
    `insert into ${input.day.toLowerCase()} (exerciseName, exerciseReps, exerciseSets) values ('${
      input.exerciseName
    }', '${input.exerciseReps}', '${input.exerciseSets}');`,
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};

module.exports.getRoutine = getRoutine;
module.exports.addExercise = addExercise;
