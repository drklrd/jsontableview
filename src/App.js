import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import AceEditor from './components/Aceeditor';
import Tabulator from './libs/Tabulator';
import Cookie from 'react-cookies';

class App extends Component {

        constructor(){
            super();
            if(Cookie.load('json')){
                console.log(Cookie.load('json'))
            }
            this.state = {
                editorContent : Cookie.load('json') ? JSON.stringify(Cookie.load('json'),null,'\t') : ""
            };
            this.onClickHandler = this.onClickHandler.bind(this);
            this.setValue = this.setValue.bind(this);
            this.inputChanged = this.inputChanged.bind(this);
            this.inputChangedChild = this.inputChangedChild.bind(this);
        }

        onClickHandler(){
            if(!this.state.editorContent.length) return;
            try {
                let validJSON = JSON.parse(this.state.editorContent);
                if(!Array.isArray(validJSON)){
                    validJSON = [validJSON];
                }
                let uniqueKeys = [];
                validJSON.forEach(json=>{
                    if(typeof json === "object"){
                        for(var key in json){
                            if(uniqueKeys.indexOf(key) === -1){
                                uniqueKeys.push(key);
                            }
                        }
                    }
                })
                const keys = uniqueKeys;
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
            Cookie.save('json',(value));
            this.setState({
                editorContent : value
            });
        }

        inputChanged(index,e,key){
            const json = this.state.validJSON;
            json[index][key] = this.preserveDatatype(json[index][key],e.target.value);
            this.setState({
                validJSON : json,
                editorContent : JSON.stringify(json,null,'\t')
            })
        }

        inputChangedChild(elementpath,key,inputvalue,indexvalue){
            elementpath = elementpath + `-${indexvalue}`;
            let traverse = elementpath.split('-');
            let travereddata=  this.state.validJSON;
            traverse.forEach((trav)=>{
                if(Number.isInteger(Number(trav))){
                    travereddata = travereddata[Number(trav)];
                }else{
                    travereddata = travereddata[trav];
                }
            })
            travereddata[key] = this.preserveDatatype(travereddata[key],inputvalue.target.value) ;
            this.setState({
                validJSON : this.state.validJSON,
                editorContent : JSON.stringify(this.state.validJSON,null,'\t')
            })

        }

        preserveDatatype(original,value){
            return typeof original === 'number' ? Number(value) : value;
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
                          <button className="text-align container btn btn-primary btn-convert" onClick={this.onClickHandler}  >
                              Convert
                          </button>
                      </div>
                      <div className="col-6 table-area">
                          <Tabulator  keys={this.state.keys} validJSON={this.state.validJSON} inputChanged={this.inputChanged}  inputChangedChild={this.inputChangedChild}/>
                      </div>
                    </div>
                </div>
            );
        }
}

export default App;
