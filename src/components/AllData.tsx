import axios from 'axios';
import moment from 'moment';
import React, { memo, useState, useEffect } from 'react';

import formatNumber, { dataPoints, DataPoint, statesData } from '../utils/misc';
// import USChart from './USChart';
import { useParams } from 'react-router-dom';
import { find } from 'lodash-es';
import { Typography } from '@material-ui/core';
import MyChart from './MyChart';

// interface Props {
//   state: string;
// }

const AllData = () => {
  const { slug } = useParams();
  // console.log('slug', slug);
  const [loading, setLoading] = useState(true);
  const [currentSlug, setCurrentSlug] = useState(slug);
  // TODO: fix this any situ
  const [data, setData] = useState<any[] | undefined>(undefined);
  const stateCode: string | undefined = find(statesData, ['slug', currentSlug])
    ?.code;
  const stateFullName: string | undefined = find(statesData, [
    'slug',
    currentSlug,
  ])?.state;

  useEffect(() => {
    if (slug !== setCurrentSlug) {
      setCurrentSlug(slug);
      setLoading(true);
      setData(undefined);
    }
  }, [slug]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://covidtracking.com/api/v1/states/${stateCode?.toLowerCase()}/daily.json`,
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
        <Typography variant="h3">{stateFullName}</Typography>
        <Typography variant="h4">Loading...</Typography>
      </>
    );
  // console.log('data', data);

  const datedData = data.map(d => {
    const date = moment(String(d.date));
    return {
      ...d,
      date: new Date(date.year(), date.month(), date.date()),
    };
  });

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {stateFullName}
      </Typography>
      {dataPoints.map(({ point, label }: DataPoint) => (
        <MyChart
          key={label}
          title={`${label} - ${formatNumber(datedData[0][point])}`}
          label={label}
          chartData={datedData.map(d => [new Date(d.date), d[point]])}
        />
        // <USChart
        //   key={label}
        //   label={`${label} - ${formatNumber(datedData[0][point])}`}
        //   data={datedData.map(d => ({
        //     x: d.date,
        //     y: d[point],
        //   }))}
        // />
      ))}
    </>
  );
};

export default memo(AllData);
