import React, { Component } from 'react';
import Cookie from 'react-cookies';
import './App.css';
import Header from './components/Header';
import AceEditor from './components/Aceeditor';
import Tabulator from './libs/Tabulator';
import 'brace/mode/java';
import 'brace/theme/monokai';

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
            this.inputChangedChildNoKeys = this.inputChangedChildNoKeys.bind(this);
            this.deleteRow = this.deleteRow.bind(this);
        }

        onClickHandler(){
            if(!this.state.editorContent.length) return;
            try {
                this.setState({
                    validJSON : []
                },()=>{
                    try{
                        let validJSON = JSON.parse(this.state.editorContent);
                        if(typeof validJSON !== 'object'){
                            alert('Must be valid JSON object');
                            return;
                        }
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
                        alert('Must be valid JSON object');
                        return;
                    }
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

        pathTraversal(elementpath,validJSON){
            let traverse = elementpath.split('-');
            let travereddata= validJSON;
            traverse.forEach((trav)=>{
                if(Number.isInteger(Number(trav))){
                    if(Array.isArray(travereddata)){
                        travereddata = travereddata[Number(trav)];
                    }
                }else{
                    travereddata = travereddata[trav];
                }
            })
            return travereddata;
        }

        deleteRow(indexvalue){
            let travereddata = this.state.validJSON;
            travereddata.splice(indexvalue,1);
            this.setState({
                validJSON : this.state.validJSON,
                editorContent : JSON.stringify(this.state.validJSON,null,'\t')
            })
        }

        inputChangedChild(elementpath,key,inputvalue,indexvalue){
            let travereddata = this.pathTraversal(elementpath,this.state.validJSON);
            if(Array.isArray(travereddata)){
                travereddata = travereddata[indexvalue];
            }
            travereddata[key] = this.preserveDatatype(travereddata[key],inputvalue.target.value) ;
            this.setState({
                validJSON : this.state.validJSON,
                editorContent : JSON.stringify(this.state.validJSON,null,'\t')
            })

        }

        inputChangedChildNoKeys(elementpath,inputvalue,index){
            let travereddata = this.pathTraversal(elementpath,this.state.validJSON);
            travereddata[index] = this.preserveDatatype(travereddata[index],inputvalue.target.value) ;
            console.log('NICE',travereddata[index])
            this.setState({
                validJSON : this.state.validJSON,
                editorContent : JSON.stringify(this.state.validJSON,null,'\t')
            })
        }

        preserveDatatype(original,value){
            return (typeof original === "number") ? Number(value) : value;
        }

        render() {
            return (
                <div className="App">
                    <Header convertAction={this.onClickHandler}/>
                    <div className="row">
                      <div className="col-sm-4 col-12 padding-zero">
                          <AceEditor
                              editorValue = {this.state.editorContent}
                              setValue={this.setValue}
                          />
                          <button className=" btn btn-primary btn-convert" onClick={this.onClickHandler}  >
                              Convert &nbsp;
                              <i className="fa fa-hand-o-right" aria-hidden="true"></i>
                          </button>
                      </div>
                      <div className="col-sm-8 col-12">
                          <div className=" table-area">
                              <Tabulator deleteRow={this.deleteRow}  keys={this.state.keys} validJSON={this.state.validJSON} inputChanged={this.inputChanged}  inputChangedChild={this.inputChangedChild} inputChangedChildNoKeys={this.inputChangedChildNoKeys}/>
                          </div>
                      </div>

                    </div>
                </div>
            );
        }
}

export default App;
