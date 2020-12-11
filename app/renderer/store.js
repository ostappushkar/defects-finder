import { createStore, applyMiddleware, compose} from 'redux';
import { electronEnhancer } from 'redux-electron-store'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import main from './reducers/';

export default function configureStore(initialState) {
  const middlewares = [thunk, logger];

  const enhancer = compose(applyMiddleware(...middlewares), electronEnhancer(true));

  return createStore(main, initialState, enhancer);
}
