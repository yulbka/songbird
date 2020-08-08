import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { App } from './containers/App';

import './main.scss';

ReactDOM.render(
  <HashRouter>
    <Switch>
    <Route exact path='/'>
      <Redirect to='/train' />
      </Route>
      <Route path='/train'>
        <App />
      </Route>
      <Route path='/sparrow'>
        <App />
      </Route>
      <Route path='/forest'>
        <App />
      </Route>
      <Route path='/song'>
        <App />
      </Route>
      <Route path='/predator'>
        <App />
      </Route>
      <Route path='/sea'>
        <App />
      </Route>
    </Switch>    
  </HashRouter>,
  document.getElementById('root')
);

