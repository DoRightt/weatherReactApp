import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink } from 'react-router-dom';

export class Navigation extends Component {
    render() {
        return (
            <nav className="header__nav nav">
                <NavLink exact to="/weatherApp/dist" activeClassName="nav--active" className="nav__item">Сегодня</NavLink>
                <NavLink to="/weatherApp/dist/tomorrow" activeClassName="nav--active" className="nav__item">Завтра</NavLink>
                <NavLink to="/weatherApp/dist/threedays" activeClassName="nav--active" className="nav__item">3 дня</NavLink>
                <NavLink to="/weatherApp/dist/tendays" activeClassName="nav--active" className="nav__item">10 дней</NavLink>
                <NavLink to="/weatherApp/dist/twoweeks" activeClassName="nav--active" className="nav__item">2 недели</NavLink>
            </nav>
        )
    }
}