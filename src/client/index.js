import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './app';


import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/react-bootstrap-typeahead/css/Typeahead.css';
ReactDOM.render(
  <Router basename={'/demo/'}>
    <App />
  </Router>, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
