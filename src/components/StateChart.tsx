import {
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryTooltip,
} from 'victory';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import React, { memo, useState, useEffect } from 'react';

// import { IState } from '../types';
import { useParams } from 'react-router-dom';
import OptionsSelect from './OptionsSelect';

interface DomainTuple {
  x?: [number, number] | [Date, Date] | undefined;
  y?: [number, number] | [Date, Date] | undefined;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const StateChart = () => {
  const { state } = useParams();
  const [zoomDomain, setZoomDomain] = useState<DomainTuple>({
    x: [new Date(2020, 5, 1), new Date(2020, 5, 17)],
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [optionA, setOptionA] = useState<string>('deathIncrease');
  // const [optionB, setOptionB] = useState<string>('deathIncrease');

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

  const myData = data?.map(d => {
    const foo = moment(String(d.date));
    return {
      ...d,
      date: new Date(foo.year(), foo.month(), foo.date()),
    };
  });
  // console.log('myData', myData);
  // console.log('foo', foo.year(), foo.month(), foo.date());

  const handleZoom = (domain: DomainTuple) => {
    setZoomDomain(domain);
  };

  return (
    <Root>
      <h1>{state.toUpperCase()}</h1>
      <OptionsSelect
        // color="tomato"
        initialValue={optionA}
        onChange={setOptionA}
      />
      <VictoryChart
        // padding={{ left: 75, top: 50 }}
        theme={VictoryTheme.material}
        width={500}
        height={350}
        // animate={{ duration: 500 }}
        scale={{ x: 'time' }}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: 'tomato' },
            // parent: { border: '1px solid #ccc' },
          }}
          data={myData}
          x="date"
          y={optionA}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
          // interpolation="linear"
        />
        {/* <VictoryLine
          style={{ data: { stroke: '#f0f' } }}
          data={myData}
          x="date"
          y={optionB}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
        /> */}
        <VictoryAxis dependentAxis />
        <VictoryAxis
          // label="Month"
          // tickValues={[
          //   new Date(2020, 2, 1),
          //   new Date(2020, 3, 1),
          //   new Date(2020, 4, 1),
          //   new Date(2020, 5, 1),
          // ]}
          tickFormat={t => moment(t).format('M-DD')}
          // tickFormat={t => moment(`${t}`).format('MMM')}
        />
      </VictoryChart>
      <VictoryChart
        // padding={{ top: 50, left: 50, right: 50, bottom: 50 }}
        // padding={{ top: 50 }}
        width={500}
        height={250}
        scale={{ x: 'time' }}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain}
            onBrushDomainChange={handleZoom}
          />
        }
      >
        <VictoryLine
          style={{ data: { stroke: 'tomato' } }}
          data={myData}
          x="date"
          y={optionA}
        />
        <VictoryAxis
          tickValues={[
            new Date(2020, 2, 1),
            new Date(2020, 3, 1),
            new Date(2020, 4, 1),
            new Date(2020, 5, 1),
          ]}
          // tickFormat={t => moment(`${t}`).format('MMM')}
          tickFormat={t => moment(t).format('MMM')}
          // tickFormat={x => new Date(x).getMonth()}
        />
      </VictoryChart>
    </Root>
  );
};

export default memo(StateChart);
