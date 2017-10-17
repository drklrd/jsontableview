import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
        <div>
            <Header/>
            <div className="row">
              <div className="col-6">
                  <h1>Part 1</h1>
              </div>
              <div className="col-6">
                  <h1>Part 2</h1>
              </div>
            </div>
        </div>
    );
  }
}

export default App;
