import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PeopleComponent from './components/PeopleComponent/PeopleComponent';
import logo from './img/sw.png';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link className="navbar-brand" to={`/`}>
            <img src={logo} width="190" className="d-inline-block align-top" alt="" />
          </Link>
        </nav>
        <div className="container py-3">
          <Switch>
            <Route exact path="/">
              <h3 className="text-center">
                <Link to={`/people1`} className="text-dark">Star Wars People</Link>
              </h3>
            </Route>
            <Route path="/people:id" children={<PeopleComponent />} />
          </Switch>
        </div >
      </div>
    </Router >
  );
}

export default App;