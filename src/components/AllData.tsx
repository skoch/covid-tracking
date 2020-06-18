import { VictoryAxis, VictoryLine, VictoryChart, VictoryTheme } from 'victory';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import React, { memo, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 700px; */
`;

const Charts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ChartWrapper = styled.div`
  margin: 5px;
  border: 1px solid tomato;
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

const formatNumber = (num: number) => {
  return Math.floor(num)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

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
  const { state } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[] | undefined>(undefined);

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
      <h1>{state.toUpperCase()}</h1>
      <Charts>
        {pointsDeux.map(({ point, label }) => (
          <ChartWrapper>
            <h2>{label}</h2>
            <VictoryChart
              padding={{ top: 50, left: 75, right: 50, bottom: 50 }}
              theme={VictoryTheme.material}
              width={500}
              height={250}
            >
              <VictoryLine
                style={{ data: { stroke: 'tomato' } }}
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
