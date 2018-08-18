import React, { Component } from 'react';
import EventLink from '../EventLink/EventLink.js';
import './InputDate.css';

class InputDate extends Component {

  render() {
    return (
      <div className='Graph-container'>
        <p>Current date displaying is {this.props.currentDate}</p>
        <p>
          Search for an event on 
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              onChange={this.props.onChange}
            />
            <button onClick={this.props.submit} value={this.props.currentDate}>Submit</button>
        </p>
        <p>Click on an event to see more info.</p>
        <EventLink data={this.props.data} />
      </div>
    );
  }
}

export default InputDate;
