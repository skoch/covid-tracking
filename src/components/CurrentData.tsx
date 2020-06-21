import axios from 'axios';
import moment from 'moment';
import { find } from 'lodash-es';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import React, { memo, useState, useEffect } from 'react';

import {
  Header,
  Header2,
  Card,
  PageLabel,
  fadeIn,
  StyledLink,
} from '../styles/Styles';

import { IStateData } from '../types';

import formatNumber, { statesData, DataPoint, dataPoints } from '../utils/misc';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${fadeIn};
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  margin-top: 2rem;
`;

const Label = styled.h3`
  margin: 0;
  font-size: 1.8rem;
`;

const Value = styled.h3`
  margin: 0;
  font-family: 'basier';
  font-size: 1.6rem;
`;

const CurrentData = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IStateData | undefined>(undefined);

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
      <StyledLink to={`/all/${slug}`}>View Charts</StyledLink>
      <PageLabel>Current Data</PageLabel>
      <Header>{stateFullName}</Header>
      <Header2>{day.format('MMM Do, YYYY')}</Header2>
      <Cards>
        {dataPoints.map(({ point, label }: DataPoint) => {
          return (
            <Card key={label}>
              <Label>{label}</Label>
              <Value>
                {formatNumber(Number(data[point as keyof IStateData]))}
              </Value>
            </Card>
          );
        })}
      </Cards>
    </Root>
  );
};

export default memo(CurrentData);
