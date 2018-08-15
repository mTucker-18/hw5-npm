import React, { Component } from 'react';
import './EventLink.css';

class EventLink extends Component {

  // visits the url of the earthquake event
  eventPage = () => {
    window.location.href = this.props.data[0].properties.url;
  }

  render() {
    return (
      <div className="Graph-bars">
        {
          this.props.data.map(datum => (
            <div className="Bar" style={{height: datum.properties.mag * 10 + "%"}}>
              <p onClick={this.eventPage}> Mag {datum.properties.mag} </p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default EventLink;
