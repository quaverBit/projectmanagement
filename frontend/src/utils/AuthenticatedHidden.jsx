import {Redirect, Route} from "react-router-dom";
import React from "react";
import dataMemoryService from "../../services/storage";

export const AuthenticatedHidden = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => (
    dataMemoryService.getItem('currentUser') ?
      <Component {...rest} /> : null
  )} />
};