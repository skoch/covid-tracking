import React, { useMemo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface Props {
  icon?: any;
  primary: string;
  secondary: string;
  to: string;
  selected: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  }),
);

const ListItemLink = ({ icon, primary, secondary, to, selected }: Props) => {
  const classes = useStyles();

  const CustomLink = useMemo(
    () =>
      React.forwardRef<any, Omit<LinkProps, 'to'>>((props, ref) => (
        <Link ref={ref} to={to} {...props} />
      )),
    [to],
  );

  return (
    <ListItem
      button
      component={CustomLink}
      className={`${selected ? classes.link : ''}`}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
};

export default ListItemLink;
