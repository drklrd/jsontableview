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
            this.inputChanged = this.inputChanged.bind(this);
        }

        onClickHandler(){
            if(!this.state.editorContent.length) return;
            try {
                const validJSON = JSON.parse(this.state.editorContent);
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
            console.log('@@@',json)
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
                          {this.state.keys && this.state.keys.length &&
                              <table className="json-table">
                                  <tbody>
                                      <tr>
                                          {
                                              this.state.keys.map((element,index) => {
                                                  return(
                                                      <th key={index}> {element} </th>
                                                  );
                                              })
                                          }
                                      </tr>
                                      {
                                          this.state.validJSON && this.state.validJSON.length &&
                                          this.state.validJSON.map((element,index) => {
                                              return(
                                                <tr key={index}>
                                                    {
                                                        this.state.keys.map((value,indexvalue)=>{
                                                            return(
                                                                <td key={indexvalue}>
                                                                    <input defaultValue={element[value]} onChange={(indexvalue)=>this.inputChanged(index,indexvalue,value)} className="table-input"></input>
                                                                </td>
                                                            );
                                                        })
                                                    }
                                                </tr>
                                              );
                                          })
                                      }
                                  </tbody>
                              </table>


                          }
                      </div>
                    </div>
                </div>
            );
        }
}

export default App;
