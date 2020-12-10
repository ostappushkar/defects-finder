import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './components/Main';
import Cumulative from './components/Graph/Cumulative';
import Graph from './components/Graph';
import Result from './components/Result';



export default (
  <Switch>
    <Route exact path="/cumulative" component={Cumulative} />
    <Route exact path="/graph" component={Graph} />
    <Route exact path="/result" component={Result} />
    <Route exact path="/" component={Main} />
  </Switch>
);
