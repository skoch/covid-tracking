import axios from 'axios';
import React, { memo, useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';

import { IStateData } from '../types';

import MyChart from './MyChart';
import formatNumber from '../utils/misc';

const USDaily = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IStateData[] | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          'https://covidtracking.com/api/v1/us/daily.json',
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

  if (loading || !data)
    return (
      <>
        <Typography variant="h3">United States</Typography>
        <Typography variant="h4">Loading...</Typography>
      </>
    );
  // console.log('data', data);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        United States
      </Typography>
      <MyChart
        label="Death"
        title={`Death - ${formatNumber(data[0].death)}`}
        chartData={data.map(d => [new Date(d.dateChecked), d.death])}
      />
      <MyChart
        label="Death Increase"
        title={`Death Increase - ${formatNumber(data[0].deathIncrease)}`}
        chartData={data.map(d => [new Date(d.dateChecked), d.deathIncrease])}
      />
      <MyChart
        label="Positive"
        title={`Positive - ${formatNumber(data[0].positive)}`}
        chartData={data.map(d => [new Date(d.dateChecked), d.positive])}
      />
      <MyChart
        label="Positive Increase"
        title={`Positive Increase - ${formatNumber(data[0].positiveIncrease)}`}
        chartData={data.map(d => [new Date(d.dateChecked), d.positiveIncrease])}
      />
    </>
  );
};

export default memo(USDaily);
