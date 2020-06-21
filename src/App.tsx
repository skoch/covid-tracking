import React from 'react';

// import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AllData from './components/AllData';
import StateList from './components/StateList';
import StateChart from './components/StateChart';
import CurrentData from './components/CurrentData';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/:state" component={StateChart} />
          <Route exact path="/all/:slug" component={AllData} />
          <Route exact path="/current/:slug" component={CurrentData} />
          <Route exact path="/" component={StateList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
