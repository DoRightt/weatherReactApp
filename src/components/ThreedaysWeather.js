import React, { Component } from 'react';

export class ThreeDaysWeather extends Component {
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
                'partly-cloudy-night': require('../image/nightCloudy.png'),
                'sleet': require('../image/nightSnowRain.png'),
                'wind': require('../image/wind.png'),
                'fog': require('../image/fog.png'),
                'clear-day': require('../image/sun.png'),
                'clear-night': require('../image/moon.png')
            },
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
            },
            iconsURL: '',
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
            return index.hourly.map(index => {
                return index.tempC;
            })
        });
        var curWindSpeed = this.props.weatherTwo.data.weather.map(index => {
            return index.hourly.map(index => {
                return Math.round(index.windspeedKmph / 3.6);
            })
        });
        var precip = this.props.weatherTwo.data.weather.map(index => {
            return index.hourly.map(index => {
                return index.precipMM;
            })
        })

        var icons = this.props.weatherTwo.data.weather.map(index => {
            return index.hourly.map(index => {
                return index.weatherDesc[0].value;
            })
        })

        var curMonths = this.props.weatherTwo.data.weather.map(index => {
            return +index.date.split('-')[1]
        })

        var curDays = this.props.weatherTwo.data.weather.map(index => {
            return index.date.split('-')[2]
        })

        var daysOfWeek = this.props.weatherTwo.data.weather.map(index => {
            return this.state.daysName['' +(new Date(index.date)).getDay()]
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
                } else if (icons[index][el].indexOf('Mist') > -1 || icons[index][el].indexOf('Freezing fog') > 1) {
                    icons[index][el] = 'fog'
                } else if (icons[index][el].indexOf('sleet') > -1) {
                    icons[index][el] = 'sleet'
                } else if (icons[index][el].indexOf('rain') > -1 || icons[index][el].indexOf('Light drizzle') > -1) {
                    icons[index][el] = 'rain'
                }
            }
        }

        this.setState({
            temperature: curTemp,
            windSpeed: curWindSpeed,
            iconsURL: icons,
            precipes: precip,
            monthsList: curMonths,
            daysList: curDays,
            daysOfWeekList: daysOfWeek
        })

        var date = new Date(this.props.weatherTwo.data.weather[0].date).getDay();

    }


    render() {
        var degrees = this.state.iconsURL ? this.state.iconsURL : ['~', '~', '~', '~', '~', '~', '~', '~'];
        var temp = this.state.temperature ? this.state.temperature : ['~', '~', '~', '~', '~', '~', '~', '~'];
        var wind = this.state.windSpeed ? this.state.windSpeed : ['~', '~', '~', '~', '~', '~', '~', '~'];
        var precip = this.state.precipes ? this.state.precipes : ['~', '~', '~', '~', '~', '~', '~', '~'];
        var day = this.state.daysList ? this.state.daysList : ['~', '~', '~'];
        var month = this.state.monthsList ? this.state.monthsList : ['~', '~', '~'];
        var daysOfWeek = this.state.daysOfWeekList ? this.state.daysOfWeekList : ['~', '~', '~'];

        return (
            <div className="threedays__block thd-block">
                <div className="thd-block__weather">
                    <div className="thd-block__item thday-item thday-item--first">
                        <div className="thday-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[0] === 'Сб' || daysOfWeek[0] === 'Вс' ? {color: '#e25555'} : {}}>Сегодня</span>
                            <span className="cdate__day-of-month">{day[0]} {this.state.months[month[0]]}</span>
                        </div>
                        <div className="thday-item__temp">
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">03:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[0][1]]} />
                                <span className="th-info__temp">{temp[0][1]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">06:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[0][2]]} />
                                <span className="th-info__temp">{temp[0][2]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">09:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[0][3]]} />
                                <span className="th-info__temp">{temp[0][3]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">12:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[0][4]]} />
                                <span className="th-info__temp">{temp[0][4]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">15:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[0][5]]} />
                                <span className="th-info__temp">{temp[0][5]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">18:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[0][6]]} />
                                <span className="th-info__temp">{temp[0][6]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">21:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[0][7]]} />
                                <span className="th-info__temp">{temp[0][7]}&#176;</span>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <span>Скорость ветра, <i>м.с</i></span>
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[0][1]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[0][2]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[0][3]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[0][4]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[0][5]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[0][6]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[0][7]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <span>Осадки, <i>мм</i></span>
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[0][1]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[0][2]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[0][3]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[0][4]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[0][5]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[0][6]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[0][7]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="thd-block__item thday-item">
                        <div className="thday-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[1] === 'Сб' || daysOfWeek[1] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[1]}</span>
                            <span className="cdate__day-of-month">{day[1]} {this.state.months[month[1]]}</span>
                        </div>
                        <div className="thday-item__temp">
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">03:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[1][1]]} />
                                <span className="th-info__temp">{temp[1][1]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">06:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[1][2]]} />
                                <span className="th-info__temp">{temp[1][2]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">09:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[1][3]]} />
                                <span className="th-info__temp">{temp[1][3]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">12:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[1][4]]} />
                                <span className="th-info__temp">{temp[1][4]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">15:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[1][5]]} />
                                <span className="th-info__temp">{temp[1][5]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">18:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[1][6]]} />
                                <span className="th-info__temp">{temp[1][6]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">21:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[1][7]]} />
                                <span className="th-info__temp">{temp[1][7]}&#176;</span>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <span>Скорость ветра, <i>м.с</i></span>
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[1][1]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[1][2]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[1][3]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[1][4]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[1][5]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[1][6]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">13</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <span>Осадки, <i>мм</i></span>
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[1][1]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[1][2]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[1][3]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[1][4]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[1][5]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[1][6]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[1][7]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="thd-block__item thday-item">
                        <div className="thday-item__date">
                            <span className="cdate__day-of-week" style={daysOfWeek[2] === 'Сб' || daysOfWeek[2] === 'Вс' ? {color: '#e25555'} : {}}>{daysOfWeek[2]}</span>
                            <span className="cdate__day-of-month">{day[2]} {this.state.months[month[2]]}</span>
                        </div>
                        <div className="thday-item__temp">
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">00:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[2][1]]} />
                                <span className="th-info__temp">{temp[2][1]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">03:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[2][2]]} />
                                <span className="th-info__temp">{temp[2][2]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">09:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[2][3]]} />
                                <span className="th-info__temp">{temp[2][3]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">12:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[2][4]]} />
                                <span className="th-info__temp">{temp[2][4]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">15:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[2][5]]} />
                                <span className="th-info__temp">{temp[2][5]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">19:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[2][6]]} />
                                <span className="th-info__temp">{temp[2][6]}&#176;</span>
                            </div>
                            <div className="thday-item__info th-info">
                                <span className="th-info__time">21:00</span>
                                <img className="th-info__icon" src={this.state.iconSet[degrees[2][6]]} />
                                <span className="th-info__temp">{temp[2][7]}&#176;</span>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <span>Скорость ветра, <i>м.с</i></span>
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__wind">
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[2][1]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[2][2]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[2][3]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[2][4]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[2][5]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[2][6]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__wind">{wind[2][7]}</div>
                            </div>
                        </div>
                        <div className="current-day__separator">
                            <span>Осадки, <i>мм</i></span>
                            <div className="sep-line"></div>
                        </div>
                        <div className="thday-block__precip">
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[2][1]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[2][2]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[2][3]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[2][4]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[2][5]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[2][6]}</div>
                            </div>
                            <div className="thday__item">
                                <div className="thday-item__precip">{precip[2][7]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}