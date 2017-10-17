import React , { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';

export default class Aceeditor extends Component{
    render(){
        return (
            <AceEditor
                mode="java"
                theme="github"
            />
        );
    }
}
