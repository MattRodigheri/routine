import React from "react";

class Buttons extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.addExerciseInput(true)}>
          Add Exercise
        </button>
      </div>
    );
  }
}

export default Buttons;
