import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Setup from './components/Setup';
import Dashboard from './components/Dashboard';
import Opportunities from './components/Opportunities';
import Signout from './components/Signout';

import PrivateRoute from './components/Routes/PrivateRoute';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/setup" component={Setup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/opportunities" component={Opportunities} />
        <Route path="/signout" component={Signout} />
      </Router>
    </div>
  );
}

export default App;
