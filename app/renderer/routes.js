import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './components/Main';
import Cumulative from './components/Graph/Cumulative';
import Histogram from './components/Graph/Histogram'
import Graph from './components/Graph'
import CumulativeClusterized from './components/Graph/CumulativeClusterized';
import HistogramClusterized from './components/Graph/HistogramClusterized'

export default (
  <Switch>
    <Route exact path="/cumulative" component={Cumulative} />
    <Route exact path="/histogram" component={Histogram} />
    <Route exact path="/graph" component={Graph} />

    <Route exact path="/cumulative-clusterized" component={CumulativeClusterized} />
    <Route exact path="/histogram-clusterized" component={HistogramClusterized} />

    <Route exact path="/" component={Main} />
  </Switch>
);
