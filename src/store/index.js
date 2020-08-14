import { createStore as createReduxStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import gameReducer from './reducers';
import thunk from 'redux-thunk';

const createStore = (history) => {
  const reducer = combineReducers({
    router: connectRouter(history),
    game: gameReducer,
  });
  const middlewares = [routerMiddleware(history), thunk];
  let composeEnchancers = compose;
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
  const enchance = composeEnchancers(...[applyMiddleware(...middlewares)]);
  return createReduxStore(reducer, {}, enchance);
}

export default createStore;