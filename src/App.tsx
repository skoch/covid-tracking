import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import AllData from './components/AllData';
import Sidebar from './components/Sidebar';
import USDaily from './components/USDaily';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      // display: 'flex',
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      // flexDirection: 'row',
      // flexWrap: 'wrap',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            COVID-19 Tracking
          </Typography>
        </Toolbar>
      </AppBar>

      <BrowserRouter>
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/:slug" component={AllData} />
            <Route exact path="/" component={USDaily} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
