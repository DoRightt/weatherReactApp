import React, { Component } from 'react';

export class CurWeekWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: '',
            windSpeed: '',
            iconSet: {
                'rain': require('../image/rain.png'),
                'snow': require('../image/snow.png'),
                'cloudy': require('../image/cloud.png'),
                'partly-cloudy-day': require('../image/cloudy.png'),
                'partly-cloudy-night': require('../image/cloudy.png'),
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
            iconsURL: '',
            months: {
                0: 'Января',
                1: 'Февраля',
                2: 'Марта',
                3: 'Апреля',
                4: 'Мая',
                5: 'Июня',
                6: 'Июля',
                7: 'Августа',
                8: 'Сентября',
                9: 'Октября',
                10: 'Ноября',
                11: 'Декабря',
            },
            daysName: {
                0: 'Вс',
                1: 'Пн',
                2: 'Вт',
                3: 'Ср',
                4: 'Чт',
                5: 'Пт',
                6: 'Сб',
            },
            daysOfWeek: '',
            daysOfMonth: '',
            curMonths: ''
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
            var curTemps = this.props.weather.daily.data.map(index => {
                return [(Math.round((index.temperatureMax - 32) / 1.8)), (Math.round((index.temperatureMin - 32) / 1.8))];
            });
            var curWindSpeeds = this.props.weather.hourly.data.map(index => {
                return ((index.windSpeed * 1000) / 3600).toFixed(1)
            });
            var icons = this.props.weather.daily.data.map(index => {
                return index.icon
            })

            var arrDays = this.props.weather.daily.data.map(index => {
                return new Date(+(index.time + '000')).getDay();
            })

            var arrMonths = this.props.weather.daily.data.map(index => {
                return new Date(+(index.time + '000')).getMonth();
            })

            var arrDates = this.props.weather.daily.data.map(index => {
                return new Date(+(index.time + '000')).getDate();
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
            daysOfWeek: arrDays,
            curMonths: arrMonths,
            daysOfMonth: arrDates
        })

    }

    render() {
        var days = this.state.daysOfWeek,
            dates = this.state.daysOfMonth,
            months = this.state.curMonths;

        var temps = this.state.temperature[0] !== undefined ? this.state.temperature : ['~', '~', '~', '~', '~', '~', '~'];
        var weatherResume = this.state.iconsURL[0] !== undefined ? this.state.iconsURL : ['~', '~', '~', '~', '~', '~', '~'];

        return (
            <div className="current-week__block cweek-block">
                <div className="cweek-block__weather">
                    <div className="current-week__item cweek-item cweek-item--first">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={this.state.daysName[days[0]] === 'Сб' || this.state.daysName[days[0]] === 'Вс' ? {color: '#e25555'} : {}}>Сегодня</span>
                            <span className="cdate__day-of-month">{dates[0] + ' ' + this.state.months[months[0]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[0]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"><span>Днем</span>{temps[0][0]}&#176;</div>
                            <div className="temp__night"><span>Ночью</span>{temps[0][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[0]]}
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={this.state.daysName[days[1]] === 'Сб' || this.state.daysName[days[1]] === 'Вс' ? {color: '#e25555'} : {}}>{this.state.daysName[days[1]]}</span>
                            <span className="cdate__day-of-month">{dates[1] + ' ' + this.state.months[months[1]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[1]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"> {temps[1][0]}&#176;</div>
                            <div className="temp__night">{temps[1][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[1]]}
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={this.state.daysName[days[2]] === 'Сб' || this.state.daysName[days[2]] === 'Вс' ? {color: '#e25555'} : {}}>{this.state.daysName[days[2]]}</span>
                            <span className="cdate__day-of-month">{dates[2] + ' ' + this.state.months[months[2]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[2]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"> {temps[2][0]}&#176;</div>
                            <div className="temp__night"> {temps[2][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[2]]}
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={this.state.daysName[days[3]] === 'Сб' || this.state.daysName[days[3]] === 'Вс' ? {color: '#e25555'} : {}}>{this.state.daysName[days[3]]}</span>
                            <span className="cdate__day-of-month">{dates[3] + ' ' + this.state.months[months[3]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[3]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"> {temps[3][0]}&#176;</div>
                            <div className="temp__night"> {temps[3][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[3]]}
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={this.state.daysName[days[4]] === 'Сб' || this.state.daysName[days[4]] === 'Вс' ? {color: '#e25555'} : {}}>{this.state.daysName[days[4]]}</span>
                            <span className="cdate__day-of-month">{dates[4] + ' ' + this.state.months[months[4]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[4]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temps[4][0]}&#176;</div>
                            <div className="temp__night">{temps[4][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[4]]}
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={this.state.daysName[days[5]] === 'Сб' || this.state.daysName[days[5]] === 'Вс' ? {color: '#e25555'} : {}}>{this.state.daysName[days[5]]}</span>
                            <span className="cdate__day-of-month">{dates[5] + ' ' + this.state.months[months[5]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[5]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temps[5][0]}&#176;</div>
                            <div className="temp__night">{temps[5][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[5]]}
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={this.state.daysName[days[6]] === 'Сб' || this.state.daysName[days[6]] === 'Вс' ? {color: '#e25555'} : {}}>{this.state.daysName[days[6]]}</span>
                            <span className="cdate__day-of-month">{dates[6] + ' ' + this.state.months[months[6]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[6]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temps[6][0]}&#176;</div>
                            <div className="temp__night">{temps[6][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[6]]}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}