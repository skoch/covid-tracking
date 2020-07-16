import moment from 'moment';
import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import { IStateData } from '../types';

import formatNumber, { dataPoints, DataPoint } from '../utils/misc';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '2rem 0',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});

interface Props {
  name: string;
  state: IStateData;
}
const CurrentData = ({ name, state }: Props) => {
  const classes = useStyles();
  const day = moment(state.dateChecked);

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {`Last checked: ${day.format('MMM Do, YYYY')}`}
      </Typography>
      {dataPoints.map(({ point, label }: DataPoint) => {
        return (
          <Card key={label} className={classes.card}>
            <CardContent>
              <Typography variant="h6">{label}</Typography>
              <Typography variant="button" display="block">
                {formatNumber(Number(state[point as keyof IStateData]))}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default memo(CurrentData);
