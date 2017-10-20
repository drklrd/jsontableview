import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import AceEditor from './components/Aceeditor';

class App extends Component {

        constructor(){
            super();
            this.state = {
                editorContent : ""
            };
            this.onClickHandler = this.onClickHandler.bind(this);
            this.setValue = this.setValue.bind(this);
        }

        onClickHandler(){
            if(!this.state.editorContent.length) return;
            try {
                const validJSON = JSON.parse(this.state.editorContent);
                alert("valid")
            }
            catch(e){
                alert("Invalid JSON");
            }
        }

        setValue(value){
            this.setState({
                editorContent : value
            });
        }

        render() {
            return (
                <div className="App">
                    <Header/>
                    <div className="row">
                      <div className="col-4">
                          <AceEditor
                              editorValue = {this.state.editorContent}
                              setValue={this.setValue}
                          />
                      </div>
                      <div className="col-2 midbar">
                          <h3>Convert</h3>
                          <button className="text-align container btn btn-primary" onClick={this.onClickHandler}  >
                              Convert
                          </button>
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
