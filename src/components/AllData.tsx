import axios from 'axios';
import moment from 'moment';
import { find } from 'lodash-es';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import React, { memo, useState, useEffect } from 'react';
import { VictoryAxis, VictoryLine, VictoryChart } from 'victory';

import formatNumber, { statesData } from '../utils/misc';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  /* width: 700px; */
`;

const Charts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ChartWrapper = styled.div`
  margin: 5px;
  border: 1px solid #ff4f00;
  background-color: white;
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

// const getStyles = () => ({
//   parent: {
//     background: '#ccdee8',
//     boxSizing: 'border-box',
//     display: 'inline',
//     padding: 0,
//     fontFamily: "'Fira Sans', sans-serif",
//   },
// });

const AllData = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[] | undefined>(undefined);

  const state: string | undefined = find(statesData, [
    'slug',
    slug,
  ])?.code.toLowerCase();

  const stateFullName: string | undefined = find(statesData, ['slug', slug])
    ?.state;
  console.log('state', state);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://covidtracking.com/api/v1/states/${state}/daily.json`,
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
  // console.log('data', data);

  const datedData = data?.map(d => {
    const foo = moment(String(d.date));
    return {
      ...d,
      date: new Date(foo.year(), foo.month(), foo.date()),
    };
  });

  return (
    <Root>
      <h1>{stateFullName}</h1>
      <Charts>
        {pointsDeux.map(({ point, label }) => (
          <ChartWrapper key={label}>
            <h2>{label}</h2>
            <VictoryChart
              padding={{ top: 50, left: 75, right: 50, bottom: 50 }}
              // theme={VictoryTheme.material}
              width={500}
              height={300}
            >
              <VictoryLine
                style={{ data: { stroke: '#FF4F00' } }}
                data={datedData}
                x="date"
                y={point}
                // interpolation="natural"
              />
              <VictoryAxis dependentAxis tickFormat={t => formatNumber(t)} />
              <VictoryAxis tickFormat={t => moment(t).format('M-DD')} />
            </VictoryChart>
          </ChartWrapper>
        ))}
      </Charts>
    </Root>
  );
};

export default memo(AllData);
