import React, { Component } from 'react';
import { render } from 'react-dom';
import  { CurrentWeather } from  './CurrentWeather';

export class App extends Component {
    constructor() {
        super();
        this.state = {
            city: '',
            lat: '',
            lng: '',
            key: '745ff62a12133bcef9cbb6f306f6c3ff',
            coords: [],
            proxyUrl: 'https://cors-anywhere.herokuapp.com/',
            queryString: '',
            weatherCatalog: {}
        };
        this.setPosition = this.setPosition.bind(this);
    }

    setPosition() {
        function setCoords(position) {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                coords: [position.coords.latitude, position.coords.longitude],
                queryString: `${this.state.proxyUrl}https://api.darksky.net/forecast/${this.state.key}/${position.coords.latitude},${position.coords.longitude}`
            });
        }

        navigator.geolocation.getCurrentPosition(setCoords.bind(this))
    }

    componentWillMount() {
        var test = new Promise((res, rej) => {
            this.setPosition()
        })
    }

    render() {
        if (Object.keys(this.state.weatherCatalog).length === 0) {
            fetch(this.state.queryString)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        weatherCatalog: responseJson
                    });
                }).then((resp) => {
                console.log(this.state.weatherCatalog)
            })
                .catch((error) => {
                    console.error(error);
                });
        }

       return (
           <CurrentWeather weather={this.state.weatherCatalog} />
       )
    }
}
