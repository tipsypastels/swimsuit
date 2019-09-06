import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MouseCircle from './MouseCircle';

import Page from './Pages/Page';
import Hello from './Pages/Hello';
import Contact from './Pages/Contact';
import Bots from './Pages/Bots';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <MouseCircle />
      
      <Router>
        <Page>
          <Switch>
            <Route path="/contact" exact component={Contact} />
            <Route path="/bots" exact component={Bots} />
            <Route path="/" exact component={Hello} />
          </Switch>
        </Page>
      </Router>
    </div>
  );
}

export default App;
