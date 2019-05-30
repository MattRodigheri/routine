import React from "react";
import styles from "../styles/App.css";

class Buttons extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="buttons">
        <button onClick={() => this.props.addExerciseInput(true)}>
          Add Exercise
        </button>
      </div>
    );
  }
}

export default Buttons;
