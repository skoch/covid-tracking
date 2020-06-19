import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import React, { memo, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { IStateData } from '../types';
import formatNumber from '../utils/misc';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const DataPoint = styled.div`
  display: flex;
  margin: 5px 0;
`;

const Label = styled.h3`
  margin: 0;
  margin-right: 10px;
`;

const Value = styled.h3`
  margin: 0;
  /* display: flex; */
`;

interface DataPoint {
  point: string;
  label: string;
}

const pointsDeux: DataPoint[] = [
  { point: 'death', label: 'Death' },
  { point: 'deathIncrease', label: 'Death Increase' },
  { point: 'hospitalized', label: 'Hospitalized' },
  { point: 'hospitalizedCumulative', label: 'Hospitalized Cumulative' },
  { point: 'hospitalizedCurrently', label: 'Hospitalized Currently' },
  { point: 'hospitalizedIncrease', label: 'Hospitalized Increase' },
  { point: 'negative', label: 'Negative' },
  { point: 'negativeIncrease', label: 'Negative Increase' },
  { point: 'negativeScore', label: 'Negative Score' },
  { point: 'onVentilatorCumulative', label: 'On Ventilator Cumulative' },
  { point: 'onVentilatorCurrently', label: 'On Ventilator Currently' },
  { point: 'positive', label: 'Positive' },
  { point: 'positiveCasesViral', label: 'Positive Cases Viral' },
  { point: 'positiveIncrease', label: 'Positive Increase' },
  { point: 'positiveScore', label: 'Positive Score' },
  { point: 'positiveTestsViral', label: 'Positive Tests Viral' },
  { point: 'recovered', label: 'Recovered' },
  { point: 'total', label: 'Total' },
  { point: 'totalTestResults', label: 'Total Test Results' },
  { point: 'totalTestResultsIncrease', label: 'Total Test Results Increase' },
  { point: 'totalTestsViral', label: 'Total Tests Viral' },
];

const CurrentData = () => {
  const { state } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IStateData | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://covidtracking.com/api/v1/states/${state}/current.json`,
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

  if (loading || !data) return null;

  const day = moment(data.dateChecked);

  return (
    <Root>
      <h1>{state.toUpperCase()}</h1>
      <h2>{day.format('MMM Do, YYYY')}</h2>
      {pointsDeux.map(({ point, label }: DataPoint) => {
        return (
          <DataPoint key={label}>
            <Label>{`${label}:`}</Label>
            <Value>
              {formatNumber(Number(data[point as keyof IStateData]))}
            </Value>
          </DataPoint>
        );
      })}
    </Root>
  );
};

export default memo(CurrentData);
