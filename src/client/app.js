import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Users from './users/users'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path='/users/:id' component={Users}/>
          <Route path='/users/' component={Users}/>
        </Switch>
      </main>
    );
  }
}
