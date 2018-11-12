import React from 'react';
import moment from 'moment';
import styles from '../styles/App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {

    }
  }

  render() {
    var day = moment().format('dddd');
    var workout;
    if (day === 'Sunday') {
      workout = 'sunday'
    }
    if (day === 'Monday') {
      workout = 'monday'
    }
    return (
      <div>
        <h1>{day}</h1>
        <div>{workout}</div>
      </div>
    )
  }
}

export default App;
