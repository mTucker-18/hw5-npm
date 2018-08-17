import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header.js';
import InputDate from './components/InputDate/InputDate.js';

class App extends Component {
  state = {
    data: [],
    searchDate: '03/11/2011',
  }

// fetch data upon loading
  componentDidMount = () => {
    this.onFetch();
  }

// get data from USGS Earthquake database and populate state
  onFetch = () => {
    let quakeArr = [];

    // takes in the search criteria and adds it to the API fetch
    let cleanDate = this.state.searchDate.split('/');
    let startMonth = cleanDate[0];
    let startDay = cleanDate[1];
    let startYear = cleanDate[2];

    // increments end date accurately
    let currDate = new Date(startYear, startMonth, startDay);
    let newDate = new Date(+currDate);
    let dateValue = newDate.getDate() + 1;
    newDate.setDate(dateValue);
    let endDay = newDate.getDate();
    let endMonth = newDate.getMonth();
    let endYear = newDate.getFullYear();

    // templates the correct dates into the USGS API
    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startYear}-${startMonth}-${startDay}&endtime=${endYear}-${endMonth}-${endDay}`)
    .then(response => response.json())
    .then(data => {
      for (let quake of data.features) {
        if (quake.properties.mag > 4.5)
          quakeArr.push(quake);
        }

      // code to sort by descending magnitude
      function compare(a,b) {
        if (a.properties.mag < b.properties.mag)
          return -1;
        if (a.properties.mag > b.properties.mag)
          return 1;
        return 0;
      }
      quakeArr.sort(compare).reverse();

      // grabs the strongest 20 earthquakes for the graph
      let top20 = []
      for (let item of quakeArr) {
        if (top20.length <= 19){
          top20.push(item);
        }
      }
      if (top20.length === 0){
        alert('No major earthquakes that day.');
      }
      this.setState({
        data: top20,
      });
    });
  }

  // changes state as user types into the input box
  onChange = (event) => {
    this.setState({searchDate: event.target.value});
  }

  // refreshes page with new data
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
