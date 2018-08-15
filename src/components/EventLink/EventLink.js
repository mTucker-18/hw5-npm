import React, { Component } from 'react';
import './EventLink.css';

class EventLink extends Component {

  // visits the url of the earthquake event
  eventPage = () => {
    console.log('Event page button working', this.props.data[0].properties.url);
    window.location.href = this.props.data[0].properties.url;
  }

  render() {
    return (
      <div className="Graph-bars">
        {
          this.props.data.map(datum => (
            <div className="Bar" style={{height: datum.properties.mag * 10 + "%"}}>
              <p onClick={this.eventPage}> {datum.properties.place} </p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default EventLink;
