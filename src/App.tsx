import React from 'react';

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LineChart from './components/LineChart';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/:state" component={LineChart} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
