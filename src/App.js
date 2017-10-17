import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import AceEditor from './components/Aceeditor';

class App extends Component {
  render() {
    return (
        <div>
            <Header/>
            <div className="row">
              <div className="col-5">
                  <AceEditor />
              </div>
              <div className="col-2">
                  <h3>Convert</h3>
              </div>
              <div className="col-5">
                  <h1>Part 2</h1>
              </div>
            </div>
        </div>
    );
  }
}

export default App;
