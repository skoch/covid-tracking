import {
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryBrushContainer,
} from 'victory';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import React, { memo, useState, useEffect, ChangeEvent } from 'react';

// import { IState } from '../types';
import { useParams } from 'react-router-dom';

interface DomainTuple {
  x?: [number, number] | [Date, Date] | undefined;
  y?: [number, number] | [Date, Date] | undefined;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;
const Select = styled.select<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  padding: 5px;
`;

const LineChart = () => {
  const { state } = useParams();
  const [zoomDomain, setZoomDomain] = useState<DomainTuple>({
    x: [20200601, 20200617],
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [selectValue, setSelectValue] = useState<string>('death');
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
  console.log('data', data);

  const foo = moment(String(20200301));
  console.log('foo', foo.year(), foo.month(), foo.date());

  const handleZoom = (domain: DomainTuple) => {
    setZoomDomain(domain);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };
  return (
    <Root>
      <h1>{state.toUpperCase()}</h1>
      <Select
        bg="#f0f"
        name="option"
        onChange={handleSelectChange}
        value={selectValue}
      >
        <option value="">--Please choose an option--</option>
        <option value="death">death</option>
        <option value="deathIncrease">deathIncrease</option>
        <option value="hospitalized">hospitalized</option>
        <option value="hospitalizedCumulative">hospitalizedCumulative</option>
        <option value="hospitalizedCurrently">hospitalizedCurrently</option>
        <option value="hospitalizedIncrease">hospitalizedIncrease</option>
        <option value="negative">negative</option>
        <option value="negativeIncrease">negativeIncrease</option>
        <option value="negativeScore">negativeScore</option>
        <option value="onVentilatorCumulative">onVentilatorCumulative</option>
        <option value="onVentilatorCurrently">onVentilatorCurrently</option>
        <option value="positive">positive</option>
        <option value="positiveCasesViral">positiveCasesViral</option>
        <option value="positiveIncrease">positiveIncrease</option>
        <option value="positiveScore">positiveScore</option>
        <option value="positiveTestsViral">positiveTestsViral</option>
        <option value="recovered">recovered</option>
        <option value="total">total</option>
        <option value="totalTestResults">totalTestResults</option>
        <option value="totalTestResultsIncrease">
          totalTestResultsIncrease
        </option>
        <option value="totalTestsViral">totalTestsViral</option>
      </Select>
      <VictoryChart
        padding={{ left: 75, top: 50 }}
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
          data={data}
          x="date"
          y={selectValue}
          // interpolation="linear"
        />
        {/* <VictoryLine
          style={{ data: { stroke: '#f0f' } }}
          data={data}
          x="date"
          y="death"
        /> */}
        <VictoryAxis dependentAxis />
        <VictoryAxis
          // label="Month"
          tickValues={[20200301, 20200401, 20200501, 20200601]}
          tickFormat={t => moment(`${t}`).format('MMM')}
        />
      </VictoryChart>

      <VictoryChart
        padding={{ top: 50, left: 50, right: 50, bottom: 50 }}
        width={500}
        height={200}
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
          data={data}
          x="date"
          y={selectValue}
        />
        <VictoryAxis
          tickValues={[20200301, 20200401, 20200501, 20200601]}
          tickFormat={t => moment(`${t}`).format('MMM')}
        />
      </VictoryChart>
    </Root>
  );
};

export default memo(LineChart);
