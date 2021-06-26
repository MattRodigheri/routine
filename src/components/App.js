import React from "react";
import moment from "moment";
import axios from "axios";
// eslint-disable-next-line
import styles from "../App.css";
import Buttons from "./Buttons.js";
import AddExercise from "./AddExercise.js";
import request from "superagent";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      day: moment().format("dddd"),
      workout: [],
      addExercise: false,
      exerciseName: "",
      exerciseReps: "",
      exerciseSets: "",
      exercisePic: ""
    };
//testing
    this.addExerciseInput = this.addExerciseInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.addExerciseToDatabase = this.addExerciseToDatabase.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
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

  handleImageUpload(file) {
    let upload = request
      .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          exercisePic: response.body.secure_url
        });
      }
    });
  }

  addExerciseToDatabase() {
    axios
      .post("http://localhost:3001/api/routine", {
        day: this.state.day,
        exerciseName: this.state.exerciseName,
        exerciseReps: this.state.exerciseReps,
        exerciseSets: this.state.exerciseSets,
        exercisePic: this.state.exercisePic
      })
      .then(
        axios
          .get("http://localhost:3001/api/routine", {
            headers: { day: this.state.day }
          })
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

  removeExercise(event) {
    // taking too long
    axios
      .delete("http://localhost:3001/api/routine", {
        data: {
          day: this.state.day,
          exercise: event.target.previousSibling.id
        }
      })
      .then(
        axios
          .get("http://localhost:3001/api/routine", {
            headers: { day: this.state.day }
          })
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
  }

  render() {
    const exercises = this.state.workout.map((exercise, index) => {
      return (
        <div key={index} id={exercise.exerciseName} className="exercise">
          <div id={exercise.exerciseName}>
            <div>{exercise.exerciseName}</div>
            <img
              src={exercise.exercisePic}
              className="exercisePic"
              alt="exercise"
            />
            <div>{`${exercise.exerciseSets} sets of ${exercise.exerciseReps}`}</div>
          </div>
          <button onClick={event => this.removeExercise(event)}>Delete</button>
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
          handleImageUpload={this.handleImageUpload}
          addExerciseToDatabase={this.addExerciseToDatabase}
        />
      );
    }

    return (
      <div className="routine">
        <h1>{this.state.day}</h1>
        <Buttons addExerciseInput={this.addExerciseInput} />
        <div>{addExercise}</div>
        <div>{exercises}</div>
      </div>
    );
  }
}

export default App;
