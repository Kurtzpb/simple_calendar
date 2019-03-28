import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Layout from '../client/modules/App/container';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import reducer from './reducers';

import { Provider } from 'react-redux';

const middlewares = [thunk];

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root')
);
