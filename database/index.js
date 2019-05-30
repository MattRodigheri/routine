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
  console.log(input);
  connection.query(
    `insert into ${input.day.toLowerCase()} (exerciseName,exerciseReps,exerciseSets,exercisePic) values ('${
      input.exerciseName
    }','${input.exerciseReps}',"${input.exerciseSets}","${
      input.exercisePic
    }");`,
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};

const removeExercise = input => {
  //TO DO: more specificity on removing exercise from database
  connection.query(
    `delete from ${input.day.toLowerCase()} where exerciseName='${
      input.exercise
    }';`
  ),
    err => {
      if (err) {
        console.log(err);
      }
    };
};

module.exports.getRoutine = getRoutine;
module.exports.addExercise = addExercise;
module.exports.removeExercise = removeExercise;
