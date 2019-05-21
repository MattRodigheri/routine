import React from "react";
import moment from "moment";
import axios from "axios";
// import styles from "../styles/App.css";
import Buttons from "./Buttons.jsx";
import AddExercise from "./AddExercise.jsx";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      day: moment().format("dddd"),
      workout: [],
      addExercise: false,
      exerciseName: "",
      exerciseReps: "",
      exerciseSets: ""
    };

    this.addExerciseInput = this.addExerciseInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addExerciseToDatabase = this.addExerciseToDatabase.bind(this);
  }

  componentDidMount() {
    axios
      .get("/routine", { headers: { day: this.state.day } })
      .then(response => {
        this.setState({
          workout: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addExerciseInput(input) {
    this.setState({
      addExercise: input
    });
  }

  handleChange(event) {
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
        day: this.state.day,
        exerciseName: this.state.exerciseName,
        exerciseReps: this.state.exerciseReps,
        exerciseSets: this.state.exerciseSets
      })
      .then(
        axios
          .get("/routine", { headers: { day: this.state.day } })
          .then(response => {
            this.setState({
              workout: response.data
            });
          })
          .catch(error => {
            console.log(error);
          })
      )
      .catch(error => {
        console.log(error);
      });

    this.addExerciseInput(false);
  }

  render() {
    const exercises = this.state.workout.map((data, index) => {
      return (
        <div key={index}>
          {`${data.exerciseName}: ${data.exerciseSets} sets of ${
            data.exerciseReps
          }`}
        </div>
      );
    });
    let addExercise;

    if (this.state.addExercise) {
      addExercise = (
        <AddExercise
          day={this.state.day}
          viewAddExercise={this.addExerciseInput}
          handleChange={this.handleChange}
          addExerciseToDatabase={this.addExerciseToDatabase}
        />
      );
    }

    return (
      <div>
        <h1>{this.state.day}</h1>
        <Buttons addExerciseInput={this.addExerciseInput} />
        <div>{addExercise}</div>
        <div className="exercise">{exercises}</div>
      </div>
    );
  }
}

export default App;
