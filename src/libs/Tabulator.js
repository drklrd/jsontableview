import React , { Component } from 'react';

export default class Tabulator extends  Component {

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
                                                          { element[value] && <input value={typeof element[value] === 'object' ? JSON.stringify(element[value]) : element[value]} onChange={(indexvalue)=>this.props.inputChanged(index,indexvalue,value)} className="table-input"></input>}
                                                          { !element[value] && <input value={undefined} onChange={(indexvalue)=>this.props.inputChanged(index,indexvalue,value)} className="table-input"></input> }
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
