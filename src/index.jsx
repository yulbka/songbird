import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import history from 'history/hash';

import { App } from './containers/App';

import './main.scss';

ReactDOM.render(
  <HashRouter history={history}>
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
  </HashRouter>,
  document.getElementById('root')
);

