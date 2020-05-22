import React, { Component } from "react";
import Login from "./Login";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Sites from "./Sites";
import { USER_ID } from "./constants";
import PrisingA from "./PrisingA";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              localStorage.getItem(USER_ID) ? (
                <Redirect to={"/sites"} />
              ) : (
                <Redirect to={"/sign-in"} />
              )
            }
          />
          <Route
            exact
            path={"/sign-in"}
            render={(props) =>
              localStorage.getItem(USER_ID) ? (
                <Redirect to={"/sites"} />
              ) : (
                <Login {...props} />
              )
            }
          />
          <Route
            exact
            path={"/sites"}
            render={(props) => {
              if (localStorage.getItem(USER_ID) === "2") {
                return <Redirect to={"/pricing-a"} />;
              }
              if (!localStorage.getItem(USER_ID)) {
                return <Redirect to={"/sign-in"} />;
              }
              return <Sites {...props} />;
            }}
          />
          <Route
            exact
            path={"/pricing-a"}
            render={(props) => {
              if (!localStorage.getItem(USER_ID)) {
                return <Redirect to={"/sign-in"} />;
              }
              return <PrisingA {...props} />;
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
