import React, { Component } from "react";
// import jwt_decode from 'jwt-decode';
import {store} from './store';
import "./App.scss";
import Routes from "./Routes";
import { setCurrentUser } from './actions/authentication';

import "bootstrap/dist/css/bootstrap.min.css";
import "noty/lib/noty.css";
import "noty/lib/themes/bootstrap-v4.css";
import "font-awesome/css/font-awesome.min.css";
// localStorage.removeItem('jwtToken');
// localStorage.removeItem('auth');
if(localStorage.jwtToken) {
  const user = localStorage.auth ? JSON.parse(localStorage.auth) : null;
  // const decoded = jwt_decode(localStorage.jwtToken);
  // const currentTime = Date.now() / 1000;

  store.dispatch(setCurrentUser(user));
  // if(decoded.exp < currentTime) {
  //   store.dispatch(setCurrentUser({}));
  //   window.location.href = '/login'
  // }
}


class App extends Component {
  render() {
    return (
        <Routes />
    );
  }
}

export default App;
