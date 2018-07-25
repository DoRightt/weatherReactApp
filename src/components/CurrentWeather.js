import React, { Component } from 'react';

export class CurrentWeather  extends Component {
    constructor() {
        super();
        this.state = {
            city: '',
            key: '745ff62a12133bcef9cbb6f306f6c3ff',
            lat: '',
            lng: '',
            coords: [],
            proxyUrl: 'https://cors-anywhere.herokuapp.com/',
            queryString: '',
            weatherCatalog: {},
            temperature: ''
        };
        this.setPosition = this.setPosition.bind(this);
        this.setTemperature = this.setTemperature.bind(this);
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

    setTemperature() {
        var curTemp = ((this.state.weatherCatalog.currently.temperature - 32) / 1.8).toFixed(1);
        var curWindSpeed = ((this.state.weatherCatalog.currently.windSpeed * 1000) / 3600).toFixed(1);
        var curHumidity = this.state.weatherCatalog.currently.humidity * 100;
        var curPressure = (this.state.weatherCatalog.currently.pressure * 0.75).toFixed(1);
        this.setState({
            temperature: curTemp,
            windSpeed: curWindSpeed,
            humidity: curHumidity,
            pressure: curPressure
        })
        console.log(this.state.queryString)
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
                this.setTemperature()
            })
                .catch((error) => {
                    console.error(error);
                });
        }
        return (
            <div>
                {/*<button>Показать Температуру</button>*/}
                {/*<div>{this.state.coords.map((item, key)=> <li key={key}>{item}</li>)}</div>*/}
                <div>Температура за окном: {this.state.temperature} &#176;C</div>
                <div>Скорость ветра: {this.state.windSpeed} м/c</div>
                <div>Влажность: {this.state.humidity}%</div>
                <div>Давление: {this.state.pressure} мм. рт. ст.</div>
            </div>

        )
    }
}
