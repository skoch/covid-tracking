import React from 'react';
import { Chart } from 'react-charts';
// import { Resizable } from 're-resizable';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface Props {
  title: string;
  label?: string;
  showPoints?: boolean;
  chartData: (number | Date)[][];
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: '100%',
      height: '470px',
      marginTop: '1rem',
      marginBottom: '2rem',
      // padding: '2rem',
    },
    header: {
      margin: '2rem 0 0 2rem',
    },
  }),
);

const MyChart = ({ title, label, showPoints, chartData }: Props) => {
  // console.log('chartData', chartData);
  const classes = useStyles();
  const data = React.useMemo(
    () => [
      {
        label: label || title,
        data: chartData,
      },
    ],
    [label, title, chartData],
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: 'time',
        position: 'bottom',
      },
      { type: 'linear', position: 'left' },
    ],
    [],
  );

  const series = React.useMemo(
    () => ({
      showPoints,
    }),
    [showPoints],
  );

  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <Card className={classes.card}>
        <div
          style={{
            width: 'calc(100vw - 300px)',
            height: 'calc(100% - 40px)',
            margin: '20px',
          }}
        >
          <Chart data={data} axes={axes} series={series} tooltip />
        </div>
      </Card>
    </>
    // <Resizable
    //   style={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     border: 'solid 1px #ddd',
    //     background: '#f0f0f0',
    //     marginBottom: '20px',
    //   }}
    //   defaultSize={{
    //     width: 600,
    //     height: 450,
    //   }}
    // >

    // </Resizable>
  );
};

export default MyChart;
