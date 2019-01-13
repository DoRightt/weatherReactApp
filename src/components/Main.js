import React, { Component } from 'react';
import { CurrentWeather } from  './CurrentWeather';
import { CurDayWeather } from  './CurDayWeather';
import { CurWeekWeather } from  './CurWeekWeather';
import { ThreeDaysWeather } from  './ThreeDaysWeather';
import { TenDaysWeather } from  './TenDaysWeather';
import { TwoWeeksWeather } from  './TwoWeeksWeather';
import {TomorrowWeather} from "./TomorrowWeather";
import {Header} from "./Header";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Navigation } from './Navigation.js';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'b1091a97aa43fba0a1d63cffbf94913b',
            // keyTwo: 'f7f36a0c7c3e4214a5e193731182312',
            keyTwo: 'dd6301427900459c863160646190201',
            proxyUrl: 'https://cors-anywhere.herokuapp.com/',
            searchCity: '',
            cityInfo: '',
            changed: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        var th = this;

        var checkLocation = setInterval(function() {
            if (th.props.location.length > 0) {
                clearInterval(checkLocation);
                th.setState({
                    location: th.props.location
                })
            }
        }, 500);
    }

    onChange(e) {
        var val = e.target.value;
        this.setState({searchCity: val});
    }

    handleSubmit(e) {
        e.preventDefault();
        var searchObject = this.state.searchCity.replace(' ', '%20')
        var searchQuery = `https://api.opencagedata.com/geocode/v1/json?q=${searchObject}&key=d6cef581061d400cb369d95fa9ede066`
        fetch(searchQuery)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    changed: true,
                    cityInfo: responseJson.results[0].bounds.northeast,
                    location: this.state.searchCity,
                    lat: responseJson.results[0].bounds.northeast.lat,
                    lng: responseJson.results[0].bounds.northeast.lng,
                    queryString: `${this.state.proxyUrl}https://api.darksky.net/forecast/${this.state.key}/${responseJson.results[0].bounds.northeast.lat},${responseJson.results[0].bounds.northeast.lng}?extend=hourly`,
                    queryStringTwo: `${this.state.proxyUrl}http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${this.state.keyTwo}&q=${responseJson.results[0].bounds.northeast.lat},${responseJson.results[0].bounds.northeast.lng}&num_of_days=14&tp=4&format=json`,
                })
            })
            .then(() => {
                fetch(this.state.queryString)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            weatherCatalog: responseJson
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    })

                fetch(this.state.queryStringTwo)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            weatherCatalogTwo: responseJson
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })

        this.forceUpdate(function() {
        })
}


    render() {
        var weather = this.state.weatherCatalog ? this.state.weatherCatalog : this.props.weather;
        var weatherTwo = this.state.weatherCatalogTwo ? this.state.weatherCatalogTwo : this.props.weatherTwo;

        return (
            <BrowserRouter>
                <Switch>
                    <div>
                        <Header />
                        <form onSubmit={this.handleSubmit}>
                            <input onChange={this.onChange} type="text" placeholder="Поиск по городу"/>
                        </form>
                        <Route exact path="/weatherApp/dist" render={() =>
                            <div className="main">
                                <div className="current-location">Погода в городе - <span>{this.state.location}</span> на сегодня</div>
                                <div className="td-weather__wrapper">
                                    <CurrentWeather weather={weather} />
                                    <CurDayWeather weather={weather} />
                                </div>
                                <h2 className="main__title">Прогноз на неделю</h2>
                                <CurWeekWeather weather={weather} />
                            </div>
                        } />
                        <Route path="/weatherApp/dist/tomorrow" render={() =>
                            <div className="main">
                                <div className="current-location">Погода в городе - <span>{this.state.location}</span> на завтра</div>
                                <TomorrowWeather weatherTwo={weatherTwo} />
                            </div>
                        }/>
                        <Route path="/weatherApp/dist/threedays" render={() =>
                            <div className="main">
                                <div className="current-location">Погода в городе - <span>{this.state.location}</span> на 3 дня</div>
                                <ThreeDaysWeather weatherTwo={weatherTwo} />
                            </div>
                        }/>
                        <Route path="/weatherApp/dist/tendays" render={() =>
                            <div className="main">
                                <div className="current-location">Погода в городе - <span>{this.state.location}</span> на 10 дней</div>
                                <TenDaysWeather weatherTwo={weatherTwo} />
                            </div>
                        }/>
                        <Route path="/weatherApp/dist/twoweeks" render={() =>
                            <div className="main">
                                <div className="current-location">Погода в городе - <span>{this.state.location}</span> на 2 недели</div>
                                <TwoWeeksWeather weatherTwo={weatherTwo} />
                            </div>
                        }/>
                    </div>

                </Switch>
            </BrowserRouter>

        )
    }
}

{/*<div className="main">*/}
{/*<div className="current-location">Погода в городе - <span>{this.state.location}</span></div>*/}
{/*<CurrentWeather weather={this.props.weather} />*/}
{/*<CurDayWeather weather={this.props.weather} />*/}
{/*<h2 className="main__title">Прогноз на неделю</h2>*/}
{/*<CurWeekWeather weather={this.props.weather} />*/}
{/*/!*<ThreeDaysWeather weatherTwo={this.props.weatherTwo} />*!/*/}
{/*/!*<TenDaysWeather weatherTwo={this.props.weatherTwo} />*!/*/}
{/*/!*<TwoWeeksWeather weatherTwo={this.props.weatherTwo} />*!/*/}
{/*/!*<TomorrowWeather weatherTwo={this.props.weatherTwo} />*!/*/}
{/*</div>*/}