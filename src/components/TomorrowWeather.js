import React, { Component } from 'react';

export class TomorrowWeather extends Component {
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
            return index.hourly.map(index => {
                return index.tempC;
            })
        });
        var curWindSpeed = this.props.weatherTwo.data.weather.map(index => {
            return index.hourly.map(index => {
                return Math.round(index.windspeedKmph / 3.6);
            });
        });
        var precip = this.props.weatherTwo.data.weather.map(index => {
            return index.hourly.map(index => {
                return index.precipMM;
            });
        })

        var icons = this.props.weatherTwo.data.weather.map(index => {
            return index.hourly.map(index => {
                return index.weatherDesc[0].value;
            })
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

        console.log(icons, 'weather!!!');

        this.setState({
            temperature: curTemp,
            windSpeed: curWindSpeed,
            iconsURL: icons,
            precipes: precip,
        })

        console.log(this.props.weatherTwo, 'weather!!!');
    }

    render() {
        var degrees = this.state.iconsURL ? this.state.iconsURL : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var temp = this.state.temperature ? this.state.temperature : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var wind = this.state.windSpeed ? this.state.windSpeed[1] : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var precip = this.state.precipes ? this.state.precipes[1] : ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~', '~'];
        var weatherResume = this.state.iconsURL ? this.state.iconsURL : ['~', '~', '~', '~', '~', '~', '~', '~'];

        console.log(precip)

        return (
            <div className="current-week__block cweek-block cweek-block--ten tomorrow">
                <div className="cweek-block__weather">
                    <div className="current-week__item cweek-item cweek-item--first">
                        <div className="cweek-item__date">
                            <span className="cdate__day-of-week">00:00</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[degrees[1][0]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[0][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[1][0]]}
                        </div>
                        <div className="current-day__separator">
                            <span>Скорость ветра, <i>м.с</i></span>
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
                            <span className="cdate__day-of-week">3:00</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[degrees[1][0]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[1][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[1][1]]}
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
                            <span className="cdate__day-of-week">6:00</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[degrees[1][2]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"> {temp[2][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[1][2]]}
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
                            <span className="cdate__day-of-week">9:00</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[degrees[1][3]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day"> {temp[3][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[1][3]]}
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
                            <span className="cdate__day-of-week">12:00</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[degrees[1][4]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[4][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[1][4]]}
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
                            <span className="cdate__day-of-week">15:00</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[degrees[1][5]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[5][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[1][5]]}
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
                            <span className="cdate__day-of-week">18:00</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[degrees[1][6]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[6][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[1][6]]}
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
                            <span className="cdate__day-of-week">21:00</span>
                        </div>
                        <div className="cweek-item__icon">
                            <img src={this.state.iconSet[degrees[1][7]]} alt=""/>
                        </div>
                        <div className="cweek-item__temp">
                            <div className="temp__day">{temp[7][1]}&#176;</div>
                        </div>
                        <div className="cweek-item__resume">
                            {this.state.weatherReview[weatherResume[1][7]]}
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
                </div>
            </div>
        )
    }
}