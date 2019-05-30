import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

class AddExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="exerciseName"
          placeholder="Name"
          onChange={() => this.props.handleChange(event)}
        />
        <input
          type="text"
          name="reps"
          placeholder="Reps"
          onChange={() => this.props.handleChange(event)}
        />
        <input
          type="text"
          name="sets"
          placeholder="Sets"
          onChange={() => this.props.handleChange(event)}
        />
        <Dropzone
          onDrop={this.props.handleImageUpload}
          accept="image/*"
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {<p>Add Photo</p>}
              </div>
            );
          }}
        </Dropzone>
        <button onClick={this.props.addExerciseToDatabase}>Add</button>
        <button onClick={() => this.props.viewAddExercise(false)}>
          Cancel
        </button>
      </div>
    );
  }
}

export default AddExercise;
