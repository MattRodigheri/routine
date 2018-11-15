import React from 'react';
import moment from 'moment';
import axios from 'axios';
import styles from '../styles/App.css';
import Monday from './Monday.jsx';
import Tuesday from './Tuesday.jsx';
import Wednesday from './Wednesday.jsx';
import Thursday from './Thursday.jsx';
import Friday from './Friday.jsx';
import Saturday from './Saturday.jsx';
import Sunday from './Sunday.jsx';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      day: moment().format('dddd'),
      workout: []
    }
  }

  componentDidMount() {
    var workout = [];
    axios.get('/routine', { headers: { day: this.state.day } })
    .then((response) => {
      for (var exercise in response.data[0]) {
        if (response.data[0][exercise]) {
          workout.push(response.data[0][exercise])
        }
      }
      this.setState({
        workout: workout
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    var exercises = this.state.workout.map((exercise, index) => {
      return <div key={index}>{exercise}</div>
    })
    return (
      <div>
        <h1>{this.state.day}</h1>
        <div className='exercise'>{exercises}</div>
      </div>
    )
  }
}

export default App;
