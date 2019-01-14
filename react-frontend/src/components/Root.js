import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../App';
import JoinRoom from './joinRoom';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div id="routes-wrapper">
        <Route exact path="/" component={JoinRoom} />
        <Route path="/videochat" component={App} />
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root