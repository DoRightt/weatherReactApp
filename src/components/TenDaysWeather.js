import React, { Component } from 'react';

export class TenDaysWeather extends Component {
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
                1: 'Января',
                2: 'Февраля',
                3: 'Марта',
                4: 'Апреля',
                5: 'Мая',
                6: 'Июня',
                7: 'Июля',
                8: 'Августа',
                9: 'Сентября',
                10: 'Октября',
                11: 'Ноября',
                12: 'Декабря',
            },
            daysName: {
                0: 'Вс',
                1: 'Пн',
                2: 'Вт',
                3: 'Ср',
                4: 'Чт',
                5: 'Пт',
                6: 'Сб',
            }
        }
        this.setTemperature = this.setTemperature.bind(this);
    }

    componentWillReceiveProps() {
        var th = this;

        var checkWeatherObject = setInterval(function() {
            if (Object.keys(th.props.weatherTwo).length > 0) {
                clearInterval(checkWeatherObject);
                th.setTemperature();
            }
        }, 500);
    }

    componentWillMount() {
        var th = this;

        var checkWeatherObject = setInterval(function() {
            if (Object.keys(th.props.weatherTwo).length > 0) {
                clearInterval(checkWeatherObject);
                th.setTemperature();
            }
        }, 500);
    }

    setTemperature() {
        var curTemp = this.props.weatherTwo.data.weather.map(index => {
            return [index.mintempC, index.maxtempC]
        });
        var curWindSpeed = this.props.weatherTwo.data.weather.map(index => {
            return Math.max.apply(this, index.hourly.map(index => {
                return Math.round(index.windspeedKmph / 3.6);
            }));
        });
        var precip = this.props.weatherTwo.data.weather.map(index => {
            return index.totalSnow_cm;
        })

        var icons = this.props.weatherTwo.data.weather.map(index => {
            return index.hourly.map(index => {
                return index.weatherDesc[0].value;
            })
        })

        var curMonths = this.props.weatherTwo.data.weather.map(index => {
            return +index.date.split('-')[1];
        })

        var curDays = this.props.weatherTwo.data.weather.map(index => {
            return +index.date.split('-')[2];
        })

        var daysOfWeek = this.props.weatherTwo.data.weather.map(index => {
            return this.state.daysName['' +(new Date(index.date)).getDay()];
        })

        for (var index = 0; index < icons.length; index++) {
            for (var el = 0; el < icons[index].length; el++) {
                if (icons[index][el].indexOf('snow') > -1 || icons[index][el].indexOf('Blizzard') > -1) {
                    icons[index][el] = 'snow'
                } else if (icons[index][el].indexOf('Partly cloudy') > -1 && el > 2 && el < 7) {
                    icons[index][el] = 'partly-cloudy-day'
                } else if (icons[index][el].indexOf('Partly cloudy') > -1 && !(el > 2 && el < 7)) {
                    icons[index][el] = 'partly-cloudy-night'
                } else if (icons[index][el].indexOf('Cloudy') > -1 || icons[index][el].indexOf('Overcast') > -1) {
                    icons[index][el] = 'cloudy'
                } else if (icons[index][el].indexOf('Mist') > -1 || icons[index][el].indexOf("Freezing fog") > -1) {
                    icons[index][el] = 'fog'
                } else if (icons[index][el].indexOf('sleet') > -1) {
                    icons[index][el] = 'sleet'
                } else if (icons[index][el].indexOf('rain') > -1 || icons[index][el].indexOf('Light drizzle') > -1) {
                    icons[index][el] = 'rain'
                }
            }
        }

        icons = icons.map(index => {
            if (index.indexOf('snow') > -1) {
                index = 'snow';
            } else if (index.indexOf('rain') > -1) {
                index = 'rain';
            } else if (index.indexOf('sleet') > -1) {
                index = 'sleet';
            } else if (index.indexOf('wind') > -1) {
                index = 'wind';
            } else if (index.indexOf('partly-cloudy-day') > -1) {
                index = 'partly-cloudy-day';
            } else if (index.indexOf('partly-cloudy-night') > -1) {
                index = 'partly-cloudy-day';
            } else if (index.indexOf('cloudy') > -1) {
                index = 'cloudy';
            } else {
                index = 'clear-day'
            }
            return index;
        })

        this.setState({
            temperature: curTemp,
            windSpeed: curWindSpeed,
            iconsURL: icons,
            precipes: precip,
            monthsList: curMonths,
            daysList: curDays,
            daysOfWeekList: daysOfWeek
        })

    }

    render() {
        var degrees = this.state.iconsURL ? this.state.iconsURL : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var temp = this.state.temperature ? this.state.temperature : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var wind = this.state.windSpeed ? this.state.windSpeed : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var precip = this.state.precipes ? this.state.precipes : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var day = this.state.daysList ? this.state.daysList : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var month = this.state.monthsList ? this.state.monthsList : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var daysOfWeek = this.state.daysOfWeekList ? this.state.daysOfWeekList : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];

        return (
            <div className="current-week__block cweek-block cweek-block--ten">
                <div className="cweek-block__weather">
                    <div className="current-week__item cweek-item cweek-item--first">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[0] === 'Сб' || daysOfWeek[0] === 'Вс' ? {color: '#e25555'} : {}}>Сегодня</span>
                            <span className="cdate__day-of-month">{day[0]} {this.state.months[month[0]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[0]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"><span>Max</span>{temp[0][1]}&#176;</div>
                            <div className="temp__night"><span>Min</span>{temp[0][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <span>Максимальная скорость ветра, <i>м.с</i></span>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[0]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <span>Осадки, <i>мм</i></span>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[0]}</div>
                            </div>
                        </div>

                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[1] === 'Сб' || daysOfWeek[1] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[1]}</span>
                            <span className="cdate__day-of-month">{day[1]} {this.state.months[month[1]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[1]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"> {temp[1][1]}&#176;</div>
                            <div className="temp__night">{temp[1][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[1]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[1]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[2] === 'Сб' || daysOfWeek[2] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[2]}</span>
                            <span className="cdate__day-of-month">{day[2]} {this.state.months[month[2]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[2]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"> {temp[2][1]}&#176;</div>
                            <div className="temp__night"> {temp[2][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[2]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[2]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[3] === 'Сб' || daysOfWeek[3] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[3]}</span>
                            <span className="cdate__day-of-month">{day[3]} {this.state.months[month[3]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[3]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"> {temp[3][1]}&#176;</div>
                            <div className="temp__night"> {temp[3][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[3]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[3]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[4] === 'Сб' || daysOfWeek[4] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[4]}</span>
                            <span className="cdate__day-of-month">{day[4]} {this.state.months[month[4]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[4]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[4][1]}&#176;</div>
                            <div className="temp__night">{temp[4][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[4]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[4]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[5] === 'Сб' || daysOfWeek[5] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[5]}</span>
                            <span className="cdate__day-of-month">{day[5]} {this.state.months[month[5]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[5]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[5][1]}&#176;</div>
                            <div className="temp__night">{temp[5][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[5]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[5]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[6] === 'Сб' || daysOfWeek[6] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[6]}</span>
                            <span className="cdate__day-of-month">{day[6]} {this.state.months[month[6]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[6]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[6][1]}&#176;</div>
                            <div className="temp__night">{temp[6][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[6]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[6]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[7] === 'Сб' || daysOfWeek[7] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[7]}</span>
                            <span className="cdate__day-of-month">{day[7]} {this.state.months[month[7]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[7]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[7][1]}&#176;</div>
                            <div className="temp__night">{temp[7][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[7]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[7]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[8] === 'Сб' || daysOfWeek[8] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[8]}</span>
                            <span className="cdate__day-of-month">{day[8]} {this.state.months[month[8]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[8]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[8][1]}&#176;</div>
                            <div className="temp__night">{temp[8][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[8]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[8]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="current-week__item">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[9] === 'Сб' || daysOfWeek[9] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[9]}</span>
                            <span className="cdate__day-of-month">{day[9]} {this.state.months[month[9]]}</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[this.state.iconsURL[9]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[9][1]}&#176;</div>
                            <div className="temp__night">{temp[9][0]}&#176;</div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[9]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[9]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}