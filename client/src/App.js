import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import About from './pages/About'
import Home from './pages/Home'

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>


        <Link to="/about">About</Link>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
