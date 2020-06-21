import axios from 'axios';
import { find } from 'lodash-es';
import styled from 'styled-components';
import React, { memo, useState, useEffect } from 'react';

import { statesData } from '../utils/misc';
import { IStateData } from '../types';
import {
  Header,
  Header2,
  fadeIn,
  PageLabel,
  StyledLink,
} from '../styles/Styles';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${fadeIn};
`;

const States = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 4rem;
`;

const StateWrapper = styled.div`
  margin: 1rem;
  padding: 2rem;
  /* border: 1px solid #ff4f00; */
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  background-color: white;
  /* font-size: 21px; */
  color: black;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  align-items: center;
`;

const StateMetaDataLeft = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
`;

const StateMetaData = styled.div`
  display: flex;
  align-items: center;
`;

const Grade = styled.div`
  /* margin-left: 2rem; */
  font-size: 1.8rem;
`;

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
  // console.log('data', data);

  return (
    <Root>
      <PageLabel>Data Project</PageLabel>
      <Header>COVID&ndash;19</Header>
      <States>
        {data?.map(state => {
          const stateFullName: string | undefined = find(statesData, [
            'code',
            state.state.toUpperCase(),
          ])?.state;

          return (
            <StateWrapper key={state.hash}>
              <StateMetaDataLeft>
                <Header2>{stateFullName}</Header2>
                <Grade>{`Grade: ${state.dataQualityGrade}`}</Grade>
              </StateMetaDataLeft>
              <StateMetaData>
                <StyledLink
                  to={`/all/${stateFullName?.toLowerCase().replace(' ', '-')}`}
                >
                  All
                </StyledLink>
                <StyledLink
                  to={`/current/${stateFullName
                    ?.toLowerCase()
                    .replace(' ', '-')}`}
                >
                  Current
                </StyledLink>
              </StateMetaData>
            </StateWrapper>
          );
        })}
      </States>
    </Root>
  );
};

export default memo(StateList);
