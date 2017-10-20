import React , { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';

export default class Aceeditor extends Component{

    constructor(){
        super();
        this.handleInEditorChange = this.handleInEditorChange.bind(this);
    }

    handleInEditorChange(value){
        this.props.setValue(value);
    }

    render(){
        return (
            <AceEditor
                mode="java"
                theme="monokai"
                width="100%" height="92vh"
                value = {this.props.editorValue}
                onChange={this.handleInEditorChange}
            />
        );
    }
}
