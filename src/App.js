import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';

class App extends Component {

        constructor(){
            super();
            this.state = {
                editorContent : ""
            };
            this.onClickHandler = this.onClickHandler.bind(this);
            this.handleInEditorChange = this.handleInEditorChange.bind(this);
        }

        onClickHandler(){
            try {
                const validJSON = JSON.parse(this.state.editorContent);
            }
            catch(e){
                alert("Invalid JSON");
            }
        }

        handleInEditorChange(value){
            this.setState({
                editorContent : value
            })
        }

        render() {
            return (
                <div className="App">
                    <Header/>
                    <div className="row">
                      <div className="col-4">
                          <AceEditor
                              ref="aceeditor"
                              mode="java"
                              theme="monokai"
                              width="100%" height="92vh"
                              value={this.state.editorContent}
                              onChange={this.handleInEditorChange}
                          />
                      </div>
                      <div className="col-2 midbar">
                          <h3>Convert</h3>
                          <button className="col-xs-6 btn btn-primary" onClick={this.onClickHandler}  >
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
