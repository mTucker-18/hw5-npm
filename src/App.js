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
        if (quake.properties.mag > 4.5)
          quakeArr.push(quake);
        }

      // code to sort by magnitude TODO: componentize
      function compare(a,b) {
        if (a.properties.mag < b.properties.mag)
          return -1;
        if (a.properties.mag > b.properties.mag)
          return 1;
        return 0;
      }
      quakeArr.sort(compare).reverse();

      // grabs the top 20 earthquakes for the graph TODO: componentize
      let top20 = []
      for (let item of quakeArr) {
        if (top20.length <= 19){
          top20.push(item);
        }
      }

      this.setState({
        data: top20,
      });
    });
  }

  // Code to increment date accurately TODO: componentize
  incDate = () => {
    let currDate = new Date(2016, 0, 0);
    let newDate = new Date(+currDate);
    let dateValue = newDate.getDate() + 1;
    newDate.setDate(dateValue);
  }

  onChange = (event) => {
    this.setState({searchDate: event.target.value});
  }

  submit = (event) => {
    this.onFetch();
  }

  render() {
    return (
      <div className="Graph">
        <Header />
        <InputDate
          currentDate={this.state.searchDate}
          data={this.state.data}
          value={this.state.searchDate}
          onChange={this.onChange}
          submit={this.submit}
        />
      </div>
    );
  }
}

export default App;
