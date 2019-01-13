import React, { Component } from 'react';
import { Navigation } from './Navigation.js';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1 className="app-title">Gismeteo<span>Killer</span></h1>
                <Navigation />
            </div>
        )
    }
}
