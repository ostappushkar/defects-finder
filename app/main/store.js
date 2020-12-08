import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import reducers from '../renderer/reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const enhancer = compose(applyMiddleware(thunk, logger), electronEnhancer());
const defaultStore = {
  etalon: null,
  pattern: null,
  etalonOriginal: null,
  patternOriginal: null,
  kCount: 3,
  threshold: 30,
  clusterized: false,
  grayscaled: false,
  cumulative: [],
  histogram: [],
  cumulativeC: [],
  histogramC: [],
};
export default createStore(reducers, defaultStore, enhancer);
