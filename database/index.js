var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "routine"
});

const getRoutine = (data, callback) => {
  connection.query(`select * from ${data};`, (err, data) => {
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
