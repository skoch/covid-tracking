import axios from 'axios';
// import moment from 'moment';
import { find } from 'lodash-es';
import styled from 'styled-components';
import React, { memo, useState, useEffect } from 'react';
// import { VictoryAxis, VictoryLine, VictoryChart } from 'victory';

import { statesData } from '../utils/misc';
import { IStateData } from '../types';
import { Link } from 'react-router-dom';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  /* width: 700px; */
`;

const States = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StateWrapper = styled.div`
  margin: 5px;
  padding: 10px;
  border: 1px solid #ff4f00;
  background-color: white;
  text-decoration: none;
  font-size: 21px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grade = styled.div`
  border: 1px solid #ff4f00;
  border-radius: 50%;
  font-size: 15px;
  width: 25px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0;
`;

// interface DataPoint {
//   point: string;
//   label: string;
// }

// const pointsDeux: DataPoint[] = [
//   { point: 'death', label: 'Death' },
//   { point: 'deathIncrease', label: 'Death Increase' },
//   { point: 'hospitalized', label: 'Hospitalized' },
//   { point: 'hospitalizedCumulative', label: 'Hospitalized Cumulative' },
//   { point: 'hospitalizedCurrently', label: 'Hospitalized Currently' },
//   { point: 'hospitalizedIncrease', label: 'Hospitalized Increase' },
//   { point: 'negative', label: 'Negative' },
//   { point: 'negativeIncrease', label: 'Negative Increase' },
//   { point: 'negativeScore', label: 'Negative Score' },
//   { point: 'onVentilatorCumulative', label: 'On Ventilator Cumulative' },
//   { point: 'onVentilatorCurrently', label: 'On Ventilator Currently' },
//   { point: 'positive', label: 'Positive' },
//   { point: 'positiveCasesViral', label: 'Positive Cases Viral' },
//   { point: 'positiveIncrease', label: 'Positive Increase' },
//   { point: 'positiveScore', label: 'Positive Score' },
//   { point: 'positiveTestsViral', label: 'Positive Tests Viral' },
//   { point: 'recovered', label: 'Recovered' },
//   { point: 'total', label: 'Total' },
//   { point: 'totalTestResults', label: 'Total Test Results' },
//   { point: 'totalTestResultsIncrease', label: 'Total Test Results Increase' },
//   { point: 'totalTestsViral', label: 'Total Tests Viral' },
// ];

const StateList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IStateData[] | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://covidtracking.com/api/v1/states/current.json`,
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
  console.log('data', data);

  // const datedData = data?.map(d => {
  //   const foo = moment(String(d.date));
  //   console.log('lastUpdateEt', new Date(d.lastUpdateEt));
  //   return {
  //     ...d,
  //     date: new Date(foo.year(), foo.month(), foo.date()),
  //   };
  // });

  return (
    <Root>
      <States>
        {data?.map(state => {
          const stateFullName: string | undefined = find(statesData, [
            'code',
            state.state.toUpperCase(),
          ])?.state;

          return (
            <StateWrapper key={state.hash}>
              <div>{stateFullName}</div>
              <Grade>{state.dataQualityGrade}</Grade>
              <Link
                to={`/all/${stateFullName?.toLowerCase().replace(' ', '-')}`}
              >
                All Data
              </Link>
              <Link
                to={`/current/${stateFullName
                  ?.toLowerCase()
                  .replace(' ', '-')}`}
              >
                Current Data
              </Link>
            </StateWrapper>
          );
        })}
      </States>
    </Root>
  );
};

export default memo(StateList);
