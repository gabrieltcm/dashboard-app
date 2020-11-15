import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Main() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}
