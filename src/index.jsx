import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';

import { App } from './containers/App';

import './main.scss';

export const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={history}>
    <Switch>
      <Route exact path='/'>
        <Redirect to='/train' />
      </Route>
      <Route path='/train' component={App} />
      <Route path='/sparrow' component={App} />
      <Route path='/forest' component={App} />
      <Route path='/song' component={App} />
      <Route path='/predator' component={App} />
      <Route path='/sea' component={App} />
    </Switch>    
  </BrowserRouter>,
  document.getElementById('root')
);

