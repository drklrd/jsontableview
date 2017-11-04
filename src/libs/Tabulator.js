import React , { Component } from 'react';

export default class Tabulator extends  Component {

    _handleKeyPress(elementpath,inputvalue,index){
        if (inputvalue.key === 'Enter') {
            this.props.inputChangedChildNoKeys(elementpath,inputvalue,index);
        }
    }

    _handleKeyPressRoot(index,indexvalue,value){
        if (indexvalue.key === 'Enter') {
            this.props.inputChanged(index,indexvalue,value);
        }
    }

    _handleKeyPressChild(elementpath,value,inputvalue,index){
        if (inputvalue.key === 'Enter') {
            this.props.inputChangedChild(elementpath,value,inputvalue,index);
        }

    }

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
                                                      { element[value] && typeof element[value] !== 'object' && <input type="text"   defaultValue={element[value]}  onKeyPress={(e)=>{this._handleKeyPressChild(elementpath,value,e,index)}}  className="table-input form-control"></input> }
                                                      { !element[value] && <input type="text"  defaultValue={undefined} onKeyPress={(e)=>{this._handleKeyPressChild(elementpath,value,e,index)}} className="table-input form-control"></input> }
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
                                                { element && typeof element !== 'object' && <input type="text"  defaultValue={element} onKeyPress={(e)=>{this._handleKeyPress(elementpath,e,index)}} className="table-input form-control"></input> }
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

        let renderTable;

        if(this.props.keys && this.props.keys.length && this.props.validJSON && this.props.validJSON.length){
            let renderJSONPart;
            if(this.props.validJSON && this.props.validJSON.length){
                renderJSONPart = this.props.validJSON.map((element,index) => {
                    return(
                      <tr key={index}>
                          {
                              [<td key={"unieq"}><i className="fa fa-minus-circle deleterow" aria-hidden="true" onClick={()=>this.props.deleteRow(`${index}`)}></i></td>].concat(
                                  this.props.keys.map((value,indexvalue)=>{
                                      return(
                                          <td key={indexvalue}>
                                              { element[value] && typeof element[value] !== 'object' && <input type="text"  defaultValue={element[value]} onKeyPress={(e)=>{this._handleKeyPressRoot(index,e,value)}}  className="table-input form-control"></input>}
                                              { element[value] && typeof element[value] === 'object' && this.renderChildTable(element[value],`${index}-${value}`) }
                                              { !element[value] && <input type="text" defaultValue={element[value] === undefined ? undefined : element[value]} onKeyPress={(e)=>{this._handleKeyPressRoot(index,e,value)}}  className="table-input form-control"></input> }
                                          </td>
                                      );
                                  })
                              )

                          }
                      </tr>
                    );
                })
            }
            renderTable = <table className="json-table">
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
                    { renderJSONPart }
                </tbody>
            </table>


        }else{
            renderTable = <div></div>;
        }

        return(
            <div>
                { renderTable }
            </div>
        );
    }
}
