import React from "react";
import moment from "moment";
import axios from "axios";
// import styles from "../styles/App.css";
import Buttons from "./Buttons.jsx";
import AddExercise from "./AddExercise.jsx";
import Dropzone from "react-dropzone";
import request from "superagent";
import config from "../../../config.js";

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
      uploadedFileCloudinaryUrl: ""
    };

    this.addExerciseInput = this.addExerciseInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  removeExercise(event) {
    // taking too long
    axios
      .delete("/routine", {
        data: {
          day: this.state.day,
          exercise: event.target.previousSibling.id
        }
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
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(config.CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", config.CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }
  // https://res.cloudinary.com/mnr211/image/upload/v1559080709/upqp9wddurpd3tvcmbyj.jpg
  render() {
    const exercises = this.state.workout.map((exercise, index) => {
      return (
        <div key={index} draggable>
          <span id={exercise.exerciseName}>
            {`${exercise.exerciseName}: ${exercise.exerciseSets} sets of ${
              exercise.exerciseReps
            }`}
          </span>
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            accept="image/*"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    <p>
                      Try dropping some files here, or click to select files to
                      upload.
                    </p>
                  }
                </div>
              );
            }}
          </Dropzone>
          <button onClick={() => this.removeExercise(event)}>X</button>
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
