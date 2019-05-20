import React from "react";
import axios from "axios";

class AddExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseName: "",
      exerciseReps: "",
      exerciseSets: ""
      // exercisePic: url
    };

    this.addExerciseToDatabase = this.addExerciseToDatabase.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    if (event.target.name === "exerciseName") {
      this.setState({
        exerciseName: event.target.value
      });
    }

    if (event.target.name === "reps") {
      this.setState({
        exerciseReps: event.target.value
      });
    }

    if (event.target.name === "sets") {
      this.setState({
        exerciseSets: event.target.value
      });
    }
  }

  addExerciseToDatabase() {
    axios
      .post("/routine", {
        day: this.props.day,
        exerciseName: this.state.exerciseName,
        exerciseReps: this.state.exerciseReps,
        exerciseSets: this.state.exerciseSets
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    this.props.viewAddExercise(false);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="exerciseName"
          placeholder="Name"
          onChange={() => this.onChange(event)}
        />
        <input
          type="text"
          name="reps"
          placeholder="Reps"
          onChange={() => this.onChange(event)}
        />
        <input
          type="text"
          name="sets"
          placeholder="Sets"
          onChange={() => this.onChange(event)}
        />
        <button onClick={this.addExerciseToDatabase}>Add</button>
      </div>
    );
  }
}

export default AddExercise;
