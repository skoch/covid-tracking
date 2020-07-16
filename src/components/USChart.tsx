import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { VictoryChart, VictoryGroup, VictoryArea } from 'victory';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface Props {
  label: string;
  data: {
    x: Date;
    y: number;
  }[];
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: '45rem',
      marginBottom: '2rem',
      paddingBottom: '1rem',
    },
    header: {
      margin: '2rem 0 0 2rem',
    },
  }),
);

const USChart = ({ label, data }: Props) => {
  const classes = useStyles();
  // console.log('data>>>>', data);
  return (
    <Card className={classes.card}>
      <Typography variant="h5" className={classes.header}>
        {label}
      </Typography>
      <VictoryChart
        padding={{ top: 20, left: 75, right: 20, bottom: 30 }}
        // width={300}
        // height={150}
      >
        <VictoryGroup
          style={{
            data: { strokeWidth: 1, fillOpacity: 0.5 },
          }}
        >
          <VictoryArea
            style={{
              data: { fill: '#ff4f00', stroke: '#ff4f00' },
            }}
            data={data}
          />
        </VictoryGroup>
      </VictoryChart>
    </Card>
  );
};

export default USChart;
