import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import PrivateRoute from './util/PrivateRoute'

import './App.css';

//Components Import
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Register} className="RegisterComponent" />
        {/* <PrivateRoute exact path="user" component={} />
        <PrivateRoute exact path="dashboard" component={} /> */}
        <Route exact path="login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
