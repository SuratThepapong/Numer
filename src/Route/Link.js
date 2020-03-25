import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Page/Home/Home";
import Bisection from "../Page/Root of equation/Bisection";
import FalsePosition from "../Page/Root of equation/FalsePosition";
import OnePoint from "../Page/Root of equation/OnePoint";
import Newton from "../Page/Root of equation/Newton";
import Secant from "../Page/Root of equation/Secant";
import Lag from "../Page/Interpolation/La";


export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Home" component={Home} />
    <Route exact path="/products" component={Bisection} />
    <Route exact path="/FalsePosition" component={FalsePosition} />
    <Route exact path="/onePoint" component={OnePoint} />
    <Route exact path="/Newton" component={Newton} />
    <Route exact path="/Secant" component={Secant} />
    <Route exact path="/La" component={Lag} />
  </Switch>
);