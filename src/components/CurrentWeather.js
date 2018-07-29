import React, { Component } from 'react';
import '../style.css'

export class CurrentWeather  extends Component {
    constructor() {
        super();
        this.state = {
            temperature: ''
        };
        this.setTemperature = this.setTemperature.bind(this);
    }

    componentWillMount() {
        var th = this;
        var checkWeatherObject = setInterval(function() {
            if (Object.keys(th.props.weather).length > 0) {
                clearInterval(checkWeatherObject);
                th.setTemperature();
            }
        }, 500);
    }

    setTemperature() {
        var curTemp = ((this.props.weather.currently.temperature - 32) / 1.8).toFixed(1);
        var curWindSpeed = ((this.props.weather.currently.windSpeed * 1000) / 3600).toFixed(1);
        var curHumidity = this.props.weather.currently.humidity * 100;
        var curPressure = (this.props.weather.currently.pressure * 0.75).toFixed(1);
        this.setState({
            temperature: curTemp,
            windSpeed: curWindSpeed,
            humidity: curHumidity,
            pressure: curPressure
        })
    }

    render() {
        return (
            <div className="currentWeather-block">
                <div className="weather-prop-name">Температура за окном: <span className="weather-prop-value weather-prop-value--temp">{this.state.temperature} &#176;C</span></div>
                <div className="weather-prop-name">Скорость ветра: <span className="weather-prop-value">{this.state.windSpeed} м/c</span></div>
                <div className="weather-prop-name">Влажность: <span className="weather-prop-value">{this.state.humidity}%</span></div>
                <div className="weather-prop-name">Давление: <span className="weather-prop-value">{this.state.pressure} мм. рт. ст.</span></div>
            </div>
        )
    }
}
