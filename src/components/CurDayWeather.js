import React, { Component } from 'react';

export class CurDayWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: '',
            windSpeed: '',
            hours: '',
            iconSet: {
                'rain': require('../image/rain.png'),
                'snow': require('../image/snow.png'),
                'cloudy': require('../image/cloud.png'),
                'partly-cloudy-day': require('../image/cloudy.png'),
                'partly-cloudy-night': require('../image/nightCloudy.png'),
                'sleet': require('../image/nightSnowRain.png'),
                'wind': require('../image/wind.png'),
                'fog': require('../image/fog.png'),
                'clear-day': require('../image/sun.png'),
                'clear-night': require('../image/moon.png')
            },
            iconsURL: ''
        }
        this.setTemperature = this.setTemperature.bind(this);
    }

    componentWillReceiveProps() {
        var th = this;

        var checkWeatherObject = setInterval(function() {
            if (Object.keys(th.props.weather).length > 0) {
                clearInterval(checkWeatherObject);
                th.setTemperature();
            }
        }, 500);
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
        if (this.props.weather.hourly.data) {
            var curTemps = this.props.weather.hourly.data.map(index => {
                return (Math.round((index.temperature - 32) / 1.8));
            });
            var curWindSpeeds = this.props.weather.hourly.data.map(index => {
                return ((index.windSpeed * 1000) / 3600).toFixed(1)
            });
            var icons = this.props.weather.hourly.data.map(index => {
                return index.icon
            })
            var nextHours = this.props.weather.hourly.data.map(index => {
                return new Date(+(index.time + '000')).getHours();
            })
        }
        var curHumidity = Math.round(this.props.weather.currently.humidity * 100);
        var curPressure = Math.round((this.props.weather.currently.pressure * 0.75).toFixed(1));
        this.setState({
            temperature: curTemps,
            windSpeed: curWindSpeeds,
            humidity: curHumidity,
            pressure: curPressure,
            iconsURL: icons,
            hours: nextHours
        })
    }

    render() {
        var time = this.state.hours

        return (
            <div className="current-day__block cday-block">
                <div className="cday-block__weather">
                    <div className="current-day__item cday-item">
                        <div className="cday-item__time">
                            {time[0] < 10 ? '0' + time[0] : time[0]}<span>00</span>
                        </div>
                        <div className="cday-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[0]]} alt=""/>
                        </div>
                        <div className="cday-item__temp">
                            {this.state.temperature[0]}&#176;
                        </div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__time">
                            {time[2] < 10 ? '0' + time[2] : time[2]}<span>00</span>
                        </div>
                        <div className="cday-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[2]]} alt=""/>
                        </div>
                        <div className="cday-item__temp">
                            {this.state.temperature[2]}&#176;
                        </div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__time">
                            {time[5] < 10 ? '0' + time[5] : time[5]}<span>00</span>
                        </div>
                        <div className="cday-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[5]]} alt=""/>
                        </div>
                        <div className="cday-item__temp">
                            {this.state.temperature[5]}&#176;
                        </div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__time">
                            {time[8] < 10 ? '0' + time[8] : time[8]}<span>00</span>
                        </div>
                        <div className="cday-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[8]]} alt=""/>
                        </div>
                        <div className="cday-item__temp">
                            {this.state.temperature[8]}&#176;
                        </div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__time">
                            {time[11] < 10 ? '0' + time[11] : time[11]}<span>00</span>
                        </div>
                        <div className="cday-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[11]]} alt=""/>
                        </div>
                        <div className="cday-item__temp">
                            {this.state.temperature[11]}&#176;
                        </div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__time">
                            {time[14] < 10 ? '0' + time[14] : time[14]}<span>00</span>
                        </div>
                        <div className="cday-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[14]]} alt=""/>
                        </div>
                        <div className="cday-item__temp">
                            {this.state.temperature[14]}&#176;
                        </div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__time">
                            {time[17] < 10 ? '0' + time[17] : time[17]}<span>00</span>
                        </div>
                        <div className="cday-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[17]]} alt=""/>
                        </div>
                        <div className="cday-item__temp">
                            {this.state.temperature[17]}&#176;
                        </div>
                    </div>
                </div>
                <div className="current-day__separator">
                    <span>Скорость ветра, <i>м.с</i></span>
                    <div className="sep-line"></div>
                </div>
                <div className="cday-block__wind">
                    <div className="current-day__item">
                        <div className="cday-item__wind">{this.state.windSpeed[0]}</div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__wind">{this.state.windSpeed[2]}</div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__wind">{this.state.windSpeed[5]}</div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__wind">{this.state.windSpeed[8]}</div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__wind">{this.state.windSpeed[11]}</div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__wind">{this.state.windSpeed[14]}</div>
                    </div>
                    <div className="current-day__item">
                        <div className="cday-item__wind">{this.state.windSpeed[17]}</div>
                    </div>
                </div>
            </div>
        )
    }
}