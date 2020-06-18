import React from 'react';

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AllData from './components/AllData';
import StateChart from './components/StateChart';
import CurrentData from './components/CurrentData';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/:state" component={StateChart} />
          <Route exact path="/all/:state" component={AllData} />
          <Route exact path="/current/:state" component={CurrentData} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
