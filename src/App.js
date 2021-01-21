import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Areas, Home, Streets, States, Updates } from './pages/index';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Home />
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
          <Route exact path="/updates">
            <Updates />
          </Route>
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
