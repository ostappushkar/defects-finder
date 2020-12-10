import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import routes from './routes';
import configureStore from './store';


const initialState = {};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={routerHistory}>{routes}</HashRouter>
  </Provider>,
  rootElement,
);
