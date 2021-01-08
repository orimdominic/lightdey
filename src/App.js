import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Areas from './pages/Areas';
import States from './pages/States';
import Streets from './pages/Streets';

function App() {
  return (
    <Router>
      <nav>
        <li className="inline px-2">
          <Link to="/">Home</Link>
        </li>
        <ul className="inline">
          <li className="inline px-2">
            <Link to="/states">States</Link>
          </li>
          <li className="inline px-2">
            <Link to="/areas">Areas</Link>
          </li>
          <li className="inline px-2">
            <Link to="/streets">Streets</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <div>MockPage</div>
        </Route>
        <Route exact path="/states">
          <States />
        </Route>
        <Route exact path="/areas">
          <Areas />
        </Route>
        <Route exact path="/streets">
          <Streets />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
