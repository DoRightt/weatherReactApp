import React, { Component } from 'react';
import '../normalize.css'
import '../style.scss'
import '../image/nightCloudy.png'

export class CurrentWeather  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: '',
            curDate: new Date(),
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
            weatherReview: {
                'rain': 'Дождь',
                'snow': 'Снег',
                'cloudy': 'Пасмурно',
                'partly-cloudy-day': 'Переменная облачность',
                'partly-cloudy-night': 'Переменная облачность',
                'sleet': 'Снег с дождем',
                'wind': 'Сильный ветер',
                'fog': 'Туман',
                'clear-day': 'Ясное небо',
                'clear-night': 'Ясное небо'
            },
            windowBg: {
                'rain': require('../image/rainbg.jpg'),
                'snow': require('../image/snowbg.jpg'),
                'cloudy': require('../image/cloudybg.jpg'),
                'partly-cloudy-day': require('../image/partlycloudybg.jpg'),
                'partly-cloudy-night': require('../image/partlycloudybg.jpg'),
                'sleet': require('../image/rainbg.jpg'),
                'wind': require('../image/windbg.jpg'),
                'fog': require('../image/fogbg.jpg'),
                'clear-day': require('../image/clearDaybg.jpg'),
                'clear-night': require('../image/clearnightbg.png')
            }
        };
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

        setInterval(function() {
            th.setState({
                curDate: new Date()
            })
        }, 10000)

        var checkWeatherObject = setInterval(function() {
            if (Object.keys(th.props.weather).length > 0) {
                clearInterval(checkWeatherObject);
                th.setTemperature();
            }
        }, 500);
    }

    setTemperature() {
        var curTemp = Math.round(((this.props.weather.currently.temperature - 32) / 1.8).toFixed(1));
        var curWindSpeed = ((this.props.weather.currently.windSpeed * 1000) / 3600).toFixed(1);
        var curHumidity = Math.round(this.props.weather.currently.humidity * 100);
        var curPressure = Math.round((this.props.weather.currently.pressure * 0.75).toFixed(1));
        var icon = (this.props.weather.currently.icon)
        this.setState({
            temperature: curTemp,
            windSpeed: curWindSpeed,
            humidity: curHumidity,
            pressure: curPressure,
            iconURL: icon
        })
    }

    render() {
        var bg = {
            backgroundImage: 'url(' + this.state.windowBg[this.state.iconURL] + ')'
        }


        return (
            <div className="currentWeather-block" style={bg}>
                <div className="currentWeather__date-block">
                    <div>
                        Cейчас <span className="currentWeather__time">{this.state.curDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <br/>
                        <span className="currentWeather__date">{this.state.curDate.toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="weather-prop-name weather-prop-name--main">
                    <img className="weather-icon" src={this.state.iconSet[this.state.iconURL]} alt=""/>
                    <span className="weather-prop-value weather-prop-value--temp">{this.state.temperature}&#176;</span>
                </div>
                <p className="weather--more">{this.state.weatherReview[this.state.iconURL]}</p>
                <div className="currentWeather__detail">
                    <div className="weather-prop-name">Ветер <span className="weather-prop-value">{this.state.windSpeed} м/c</span></div>
                    <div className="weather-prop-name">Влажность <span className="weather-prop-value">{this.state.humidity}%</span></div>
                    <div className="weather-prop-name">Давление <span className="weather-prop-value">{this.state.pressure} <span>мм     рт.ст.</span></span></div>
                </div>
            </div>
        )
    }
}
