import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import AceEditor from './components/Aceeditor';
import Tabulator from './libs/Tabulator';

class App extends Component {

        constructor(){
            super();
            this.state = {
                editorContent : ""
            };
            this.onClickHandler = this.onClickHandler.bind(this);
            this.setValue = this.setValue.bind(this);
            this.inputChanged = this.inputChanged.bind(this);
        }

        onClickHandler(){
            if(!this.state.editorContent.length) return;
            try {
                let validJSON = JSON.parse(this.state.editorContent);
                if(!Array.isArray(validJSON)){
                    validJSON = [validJSON];
                }
                const keys = Object.keys(validJSON[0]);
                this.setState({
                    keys,
                    validJSON
                });
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

        inputChanged(index,e,key){
            const json = this.state.validJSON;
            json[index][key] = e.target.value;
            this.setState({
                validJSON : json,
                editorContent : JSON.stringify(json,null,'\t')
            })

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
                      <div className="col-6 table-area">
                          <h1>Table view</h1>

                          <Tabulator  keys={this.state.keys} validJSON={this.state.validJSON} inputChanged={this.inputChanged} />

                      </div>
                    </div>
                </div>
            );
        }
}

export default App;
