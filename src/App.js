import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import AceEditor from './components/Aceeditor';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header/>
            <div className="row">
              <div className="col-4">
                  <AceEditor />
              </div>
              <div className="col-2 midbar">
                  <h3>Convert</h3>
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
