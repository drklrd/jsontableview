import React , { Component } from 'react';

export default class Tabulator extends  Component {

    renderChildTable(obj,elementpath){

        if(!Array.isArray(obj)){
            obj = [obj];
        }
        let objKeys =  typeof obj[0] === "object" ?  Object.keys(obj[0]) : [];
        let tableElement;
        if(objKeys && objKeys.length){
            tableElement =
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
                                                      { element[value] && typeof element[value] === 'object' && this.renderChildTable(element[value],elementpath+ `-${index}-${value}`  ) }
                                                      { element[value] && typeof element[value] !== 'object' && <input type="text"  disabled={typeof element[value] === "number" && element[value] % 1 !== 0 }    value={element[value]} onChange={(inputvalue)=>this.props.inputChangedChild(elementpath,value,inputvalue,index)} className="table-input form-control"></input> }
                                                      { !element[value] && <input type="text"  value={undefined} onChange={(inputvalue)=>this.props.inputChangedChild(elementpath,value,inputvalue,index)} className="table-input form-control"></input> }
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
        }else{
            tableElement = <div />;
        }

        return(
            <div>
                {tableElement}
                { !objKeys.length &&
                    <table className="json-table">
                        <tbody>
                            {
                                obj && obj.length &&
                                obj.map((element,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>
                                                { element && typeof element !== 'object' && <input type="text"  disabled={typeof element === "number" && element % 1 !== 0} value={element} onChange={(inputvalue)=>this.props.inputChangedChildNoKeys(elementpath,inputvalue,index)} className="table-input form-control"></input> }
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
                                    [<th key={"unieq"} ></th>].concat(
                                        this.props.keys.map((element,index) => {
                                            return(
                                                <th key={index}> {element} </th>
                                            );
                                        })
                                    )
                                }
                            </tr>
                            {
                                this.props.validJSON && this.props.validJSON.length &&
                                this.props.validJSON.map((element,index) => {
                                    return(
                                      <tr key={index}>
                                          {
                                              [<td key={"unieq"}><i className="fa fa-minus-circle deleterow" aria-hidden="true" onClick={()=>this.props.deleteRow(`${index}`)}></i></td>].concat(
                                                  this.props.keys.map((value,indexvalue)=>{
                                                      return(
                                                          <td key={indexvalue}>
                                                              { element[value] && typeof element[value] !== 'object' && <input type="text" disabled={typeof element[value] === "number" && element[value] % 1 !== 0} value={element[value]} onChange={(indexvalue)=>this.props.inputChanged(index,indexvalue,value)} className="table-input form-control"></input>}
                                                              { element[value] && typeof element[value] === 'object' && this.renderChildTable(element[value],`${index}-${value}`) }
                                                              { !element[value] && <input type="text" value={undefined} onChange={(indexvalue)=>this.props.inputChanged(index,indexvalue,value)} className="table-input form-control"></input> }
                                                          </td>
                                                      );
                                                  })
                                              )

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
