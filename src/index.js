import React, { Component } from 'react';
import { render } from 'react-dom';
import  { CurrentWeather } from  './components/CurrentWeather'

class Main extends Component {
    render() {
        return (
            <div>
                <h1>Coords</h1>
                <CurrentWeather/>
            </div>
        )
    }
}

render(
    <Main/>,
    document.getElementById('app')
);

