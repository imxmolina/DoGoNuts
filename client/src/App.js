import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import API from "../src/utils/API";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {this.loadBoxes}
        </div>
      </div>
    );
  }


  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadDonuts();
  }

  // Loads all boxes
  loadBoxes = () => {
    API.getBox()
      .then(res =>
        this.setState({ donuts: res.data })
      )
      .catch(err => console.log(err));
  };

  loadDonuts = () => {
    //API FOR GET DONUT
    API.getDonut()
        .then(res =>
            this.setState({ donuts: res.data })
        )
        .catch(err => console.log(err));
};

  // Deletes a box from the database with a given id, then reloads box
  // deleteDonut = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };
}

export default App;
