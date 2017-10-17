import React , { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';

export default class Aceeditor extends Component{
    render(){
        return (
            <AceEditor
                mode="java"
                theme="monokai"
                width="100%" height="92vh"
            />
        );
    }
}
