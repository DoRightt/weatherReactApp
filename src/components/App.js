import React, { Component } from 'react';
import { render } from 'react-dom';
import { Main } from  './Main';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            lat: '',
            lng: '',
            key: 'b1091a97aa43fba0a1d63cffbf94913b',
            // keyTwo: 'f7f36a0c7c3e4214a5e193731182312',
            keyTwo: 'dd6301427900459c863160646190201',
            coords: [],
            proxyUrl: 'https://cors-anywhere.herokuapp.com/',
            queryString: '',
            queryStringTwo: '',
            weatherCatalog: {},
            weatherCatalogTwo: {},
            userLocation: {},
            userLocationRu: {},
        };
        this.setPosition = this.setPosition.bind(this);
    }

    setPosition() {
        function setCoords(position) {
            console.log(position)
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                coords: [position.coords.latitude, position.coords.longitude],
                queryString: `${this.state.proxyUrl}https://api.darksky.net/forecast/${this.state.key}/${position.coords.latitude},${position.coords.longitude}?extend=hourly`,
                queryStringTwo: `${this.state.proxyUrl}http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${this.state.keyTwo}&q=${position.coords.latitude},${position.coords.longitude}&num_of_days=14&tp=4&format=json`,
            });
        }

        navigator.geolocation.getCurrentPosition(setCoords.bind(this))
    }

    componentWillMount() {
        var test = new Promise((res, rej) => {
            this.setPosition()
        })
    }

    render() {
        if (Object.keys(this.state.weatherCatalog).length === 0) {
            console.log('fetch')
            fetch(this.state.queryString)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        weatherCatalog: responseJson
                    });
                })
                .catch((error) => {
                    console.error(error);
                });

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
        }

        if (Object.keys(this.state.userLocation).length === 0) {
                fetch('https://ipinfo.io/json')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        userLocation: data.city
                    })
                })
                .then(data => {
                    console.log(this.state.userLocation, 'test')
                })
                .then(data => {
                    fetch(`https://api.multillect.com/translate/json/1.0/906?method=translate/api/translate&from=en&to=ru&text=${this.state.userLocation}&sig=fcc3ab1e186311e1dea18d993b78b5d8`)
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                userLocationRu: data.result.translated.trim()
                            })
                        })
                })
        }

       return (
           <BrowserRouter>
               <Switch>
                   <div>
                       <Main location={this.state.userLocationRu} weather={this.state.weatherCatalog} weatherTwo={this.state.weatherCatalogTwo} />
                   </div>
               </Switch>
           </BrowserRouter>

       )
    }
}
