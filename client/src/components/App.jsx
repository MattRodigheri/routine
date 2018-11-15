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
      workout: [],
      exercises: []
    }
  }

  componentDidMount() {
    axios.get('/routine', { headers: { day: this.state.day } })
    .then((response) => {
      this.setState({
        workout: response.data[0]
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    for (var exercise in this.state.workout) {
      if (this.state.workout[exercise]) {
        this.state.exercises.push(<div key={this.state.workout[exercise]} className='exercise'>{this.state.workout[exercise]}</div>)
      }
    }

    return (
      <div>
        <h1>{this.state.day}</h1>
        <div>{this.state.exercises}</div>
      </div>
    )
  }
}

export default App;
