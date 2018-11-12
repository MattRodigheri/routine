import React from 'react';
import moment from 'moment';
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

    }
  }

  render() {
    var day = moment().format('dddd');
    var workout;
    if (day === 'Monday') {
      workout = <Monday />
    }
    if (day === 'Tuesday') {
      workout = <Tuesday />
    }
    if (day === 'Wednesday') {
      workout = <Wednesday />
    }
    if (day === 'Thursday') {
      workout = <Thursday />
    }
    if (day === 'Friday') {
      workout = <Friday />
    }
    if (day === 'Saturday') {
      workout = <Saturday />
    }
    if (day === 'Sunday') {
      workout = <Sunday />
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
