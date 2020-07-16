import axios from 'axios';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import List from '@material-ui/core/List';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { IStateData } from '../types';
import { find } from 'lodash-es';
import { statesData } from '../utils/misc';
import ListItemLink from './ListItemLink';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }),
);

// interface Props {
//   onStateClick(name: string, state: IStateData): void;
// }

// function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
//   return <ListItem button component="a" {...props} />;
// }

// const Sidebar = ({ onStateClick }: Props) => {
const Sidebar = () => {
  const classes = useStyles();

  const location = useLocation();
  console.log('location', location);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IStateData[] | undefined>(undefined);

  // const CustomLink = props => <Link to={to} {...props} />;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://covidtracking.com/api/v1/states/current.json`,
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (loading && !data) {
      getData();
    }
  });

  if (loading) return null;

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItemLink
          to="/"
          primary="United States"
          secondary=""
          selected={'/' === location.pathname}
        />
        {data?.map(state => {
          const stateFullName: string | undefined = find(statesData, [
            'code',
            state.state.toUpperCase(),
          ])?.state;

          const slug: string | undefined = find(statesData, [
            'code',
            state.state.toUpperCase(),
          ])?.slug;

          return stateFullName && slug ? (
            <ListItemLink
              to={slug}
              key={state.hash}
              primary={stateFullName}
              secondary={state.dataQualityGrade}
              selected={`/${slug}` === location.pathname}
            />
          ) : null;
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
