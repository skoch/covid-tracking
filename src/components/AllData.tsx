import axios from 'axios';
import moment from 'moment';
import { find } from 'lodash-es';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import React, { memo, useState, useEffect } from 'react';
import { VictoryAxis, VictoryLine, VictoryChart } from 'victory';

import formatNumber, { statesData, dataPoints, DataPoint } from '../utils/misc';
import { Header, Header2, PageLabel, StyledLink } from '../styles/Styles';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Charts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  margin-top: 4rem;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
  padding-top: 2rem;
  /* border: 1px solid #ff4f00; */
  background-color: #fff;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

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
      <StyledLink to={`/current/${slug}`}>View Current Data</StyledLink>
      <PageLabel>All Data</PageLabel>
      <Header>{stateFullName}</Header>
      <Charts>
        {dataPoints.map(({ point, label }: DataPoint) => (
          <ChartWrapper key={label}>
            <Header2>{label}</Header2>
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
