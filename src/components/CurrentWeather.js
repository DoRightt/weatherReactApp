import React, { Component } from 'react';

export class CurrentWeather  extends Component {
    constructor() {
        super();
        this.state = {
            city: '',
            key: '541f15f1c5e41841d5b46f32872da01a',
            lat: '',
            lng: '',
            coords: [],
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
                queryString: `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${this.state.key}`
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
        var curTemp = (this.state.weatherCatalog.main['temp'] - 273).toFixed(1)
        this.setState({
            temperature: curTemp
        })
    }

    render() {
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
        return (
            <div>
                <button>Показать Температуру</button>
                {/*<div>{this.state.coords.map((item, key)=> <li key={key}>{item}</li>)}</div>*/}
                <div>{this.state.temperature}</div>
            </div>

        )
    }
}
