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
      addExercise: false
    };

    this.addExerciseInput = this.addExerciseInput.bind(this);
  }

  componentDidMount() {
    var workout = [];
    axios
      .get("/routine", { headers: { day: this.state.day } })
      .then(response => {
        for (var exercise in response.data[0]) {
          if (response.data[0][exercise]) {
            workout.push(response.data[0][exercise]);
          }
        }
        this.setState({
          workout: workout
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addExerciseInput() {
    this.setState({
      addExercise: true
    });
  }

  render() {
    var exercises = this.state.workout.map((exercise, index) => {
      return <div key={index}>{exercise}</div>;
    });
    let addExercise;

    if (this.state.addExercise) {
      addExercise = <AddExercise day={this.state.day} />;
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
