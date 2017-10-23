import React , { Component } from 'react';

export default class Tabulator extends  Component {

    renderChildTable(obj,elementpath){

        if(!Array.isArray(obj)){
            obj = [obj];
        }

        let objKeys = Object.keys(obj[0]);
        return(
            <div>
                {objKeys && objKeys.length &&
                    <table className="json-table">
                        <tbody>
                            <tr>
                                {
                                    objKeys.map((element,index) => {
                                        return(
                                            <th key={index}> {element} </th>
                                        );
                                    })
                                }
                            </tr>
                            {
                                obj && obj.length &&
                                obj.map((element,index) => {
                                    return(
                                      <tr key={index}>
                                          {
                                              objKeys.map((value,indexvalue)=>{
                                                  return(
                                                      <td key={indexvalue}>
                                                          { element[value] && typeof element[value] === 'object' && this.renderChildTable(element[value],elementpath+`-${index}-${value}`) }
                                                          { element[value] && typeof element[value] !== 'object' && <input type="text" value={element[value]} onChange={(inputvalue)=>this.props.inputChangedChild(elementpath,value,inputvalue,index)} className="table-input"></input> }
                                                          { !element[value] && <input type="text" value={undefined} onChange={(inputvalue)=>this.props.inputChangedChild(elementpath,value,inputvalue,index)} className="table-input"></input> }
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
                { !objKeys.length &&

                    <table className="json-table">
                        <tbody>
                            {
                                obj && obj.length &&
                                obj.map((element,index)=>{
                                    return(
                                            <tr key={index}>
                                                <td>
                                                    { element && typeof element !== 'object' && <input type="text" value={element} onChange={(inputvalue)=>this.props.inputChangedChildNoKeys(elementpath,inputvalue,index)} className="table-input"></input> }
                                                </td>
                                            </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                }
            </div>
        );
    }

    render(){
        return(
            <div>
                {this.props.keys && this.props.keys.length &&
                    <table className="json-table">
                        <tbody>
                            <tr>
                                {
                                    this.props.keys.map((element,index) => {
                                        return(
                                            <th key={index}> {element} </th>
                                        );
                                    })
                                }
                            </tr>
                            {
                                this.props.validJSON && this.props.validJSON.length &&
                                this.props.validJSON.map((element,index) => {
                                    return(
                                      <tr key={index}>
                                          {
                                              this.props.keys.map((value,indexvalue)=>{
                                                  return(
                                                      <td key={indexvalue}>
                                                          { element[value] && typeof element[value] !== 'object' && <input value={element[value]} onChange={(indexvalue)=>this.props.inputChanged(index,indexvalue,value)} className="table-input"></input>}
                                                          { element[value] && typeof element[value] === 'object' && this.renderChildTable(element[value],`${index}-${value}`) }
                                                          { !element[value] && <input type="text" value={undefined} onChange={(indexvalue)=>this.props.inputChanged(index,indexvalue,value)} className="table-input"></input> }
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
        );
    }
}
