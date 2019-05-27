import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./containers/Errors/NotFound";
import LoginContainer from "./containers/Login/LoginContainer";
import PanelLayout from "./containers/Layout/PanelLayout";
import NewUserContainer from "./containers/Users/NewUserContainer";


export default () =>
  <Switch>

    { /* Routes Login */}
    <Route path="/login" component={LoginContainer}></Route>

    <Route path="/panel" render={props => <PanelLayout {...props} />}></Route>

    <Route path="/users/new" component={NewUserContainer}></Route>


    <Redirect from="/" to="/login" />

    { /* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>;