import React, { Component } from 'react';
import { render } from 'react-dom';
import  { App } from  './components/App';

class Main extends Component {
    render() {
        return (
            <div>
                <h1 className="app-title">Убийца Gismeteo</h1>
                <App/>
            </div>
        )
    }
}

render(
    <Main/>,
    document.getElementById('app')
);

