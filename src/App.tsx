import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import MouseCircle from './MouseCircle';

import Page from './Pages/Page';
import Hello from './Pages/Hello';
import Contact from './Pages/Contact';
import Bots from './Pages/Bots';

import './App.scss';

const supportsHistory = 'pushState' in window.history;

const App: React.FC = () => {
  return (
    <div className="App">
      <MouseCircle />
      
      <Router forceRefresh={!supportsHistory}>
        <Page>
          <Route render={({ location }) => {
            const { pathname } = window.location;
            return (  
              <TransitionGroup>
                <CSSTransition
                  key={pathname}
                  classNames="Page__transition"
                  timeout={{ enter: 1000, exit: 1000 }}
                >
                  <Route location={location} render={() => (
                    <Switch>
                      <Route path="/contact" exact component={Contact} />
                      <Route path="/bots" exact component={Bots} />
                      <Route path="/" exact component={Hello} />
                    </Switch>
                  )} />
                </CSSTransition>
              </TransitionGroup>
            );
          }} />
        </Page>
      </Router>
    </div>
  );
}

export default App;
