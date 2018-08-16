import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header.js';
import InputDate from './components/InputDate/InputDate.js';

class App extends Component {
  state = {
    data: [],
    searchDate: '03/11/2011', //TODO link this to the calendar with a function
  }                           //so user can edit state in GUI


// fetch data upon loading
  componentDidMount = () => {
    this.onFetch();
  }

// get data from USGS Earthquake database and populate state
  onFetch = () => {
    let quakeArr = [];

    let lastDayOf2015 = new Date(2016, 0, 0);
    console.log("Last day of 2015: " + lastDayOf2015.toString());
    let nextDay = new Date(+lastDayOf2015);
    let dateValue = nextDay.getDate() + 1;
    console.log("Setting the 'date' part to " + dateValue);
    nextDay.setDate(dateValue);
    console.log("Resulting date: " + nextDay.toString());

    // takes in the search criteria and adds it to the API fetch
    let cleanDate = this.state.searchDate.split('/');
    let month = cleanDate[0];
    let day = cleanDate[1];
    let year = cleanDate[2];
    let endDay = parseInt(cleanDate[1], 10) + 1;

    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${year}-${month}-${day}&endtime=${year}-${month}-${endDay}`)
    .then(response => response.json())
    .then(data => {
      for (let quake of data.features) {
        if (quake.properties.mag > 6.2)
          quakeArr.push(quake);
        }
      console.log(quakeArr);
      this.setState({
        data: quakeArr,
      });
    });
  }

  render() {
    return (
      <div className="Graph">
        <Header />
        <InputDate
          currentDate={this.state.searchDate}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
