import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import reactToWebComponent from "react-to-webcomponent";


function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export function NavPoc() {
  let basePath = '/sample'
  
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`${basePath}/`}>Home</Link>
            </li>
            <li>
              <Link to={`${basePath}/about`}>About</Link>
            </li>
            <li>
              <Link to={`${basePath}/sample`}>Sample</Link>
            </li>
            <li>
              <Link to={`${basePath}/users`}>Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path={`${basePath}/about`}>
            <About />
          </Route>
          <Route path={`${basePath}/sample`}>
            <>SAMPLE</>
          </Route>
          <Route path={`${basePath}/users`} render={() => <Users />} />

          <Route path={`${basePath}/`}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const NavComponent: CustomElementConstructor = reactToWebComponent(NavPoc, React, ReactDOM);

export default NavComponent;