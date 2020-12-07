import React from 'react';
import { Switch, Route } from 'react-router';

import Main from './components/Main';
import Graph from './components/Graph';

export default (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/cumulative" component={Graph} />
  </Switch>
);
