import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Demo1 from './demo1'
import Demo2 from './demo2'
import Demo3 from './demo3'
import styled from 'styled-components';

const LinkBox = styled.div`
  text-align:center;
  padding: 20px;
  a{
    padding: 5px 20px;
    color: blue;
  }
`;
function App() {
  const routes = [{
    path: "/",
    component: Demo1,
  }, {
    path: "/2",
    component: Demo2,
  }, {
    path: "/3",
    component: Demo3,
  }]
  return (
    <div>
      <LinkBox>
        <a href="/">demo1</a>
        <a href="/2">demo2</a>
        <a href="/3">demo3</a>
      </LinkBox>
      <Router>
        <Switch>
          {
            routes.map((r, index) => <Route
              exact
              key={index}
              path={r.path}>
              {r.component}
            </Route>)
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
