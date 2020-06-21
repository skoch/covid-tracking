import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const transitionTimingFunction = '0.4s ease-out';

export const fadeIn = css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: ${transitionTimingFunction} fadeIn;
`;

export const transition = (props: any[]) => css`
  transition: all ${transitionTimingFunction};
  transition-property: ${props.join(', ')};
`;

export const PageLabel = styled.h4`
  font-size: 1.6rem;
  margin: 4rem 0 0 0;
  font-family: 'basier';
`;

export const Header = styled.h1`
  font-family: 'knile-light';
  font-size: 3.6rem;
  /* margin: 0 0 4rem 0; */
  margin: 0;
`;

export const Header2 = styled.h2`
  font-family: 'knile-bold';
  font-size: 2.4rem;
  line-height: 1.1;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

export const StyledLink = styled(Link)`
  border: 1px solid #ff4f00;
  font-family: 'basier';
  font-size: 1.4rem;
  text-transform: uppercase;
  padding: 0.5rem 2rem;
  margin: 1rem;

  ${transition(['background-color', 'color'])}

  &:hover {
    background-color: #ff4f00;
    color: #fff;
  }
`;
