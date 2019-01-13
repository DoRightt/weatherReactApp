import React, { Component } from 'react';
import { render } from 'react-dom';
import  { App } from  './components/App'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div>
                <App/>
            </div>
        )
    }
}

render(
    <Main/>,
    document.getElementById('app')
);

