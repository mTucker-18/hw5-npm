import React, { Component } from 'react';
import EventLink from '../EventLink/EventLink.js';
import './InputDate.css';

class InputDate extends Component {

  inputDate = () => {
    console.log('search date', this.props.currentDate)
  }

  render() {
    return (
      <div className='Graph-container'>
        <p>Current date displaying is {this.props.currentDate}</p>
        <p>
          Search for a 4.5 Magnitude or greater event on
            <input type="date" />
            <button onClick={this.inputDate}>Submit</button>
        </p>
        <p>Click on an event to see more info.</p>
        <EventLink data={this.props.data} />
      </div>
    );
  }
}

export default InputDate;
