import React from 'react';
import styled from 'styled-components/native';

interface StepsProps {
  active?: boolean;
  complete?: boolean;
}

const handleState = (active: any, complete: any) => {
  if (active && !complete) {
    return {
      color: '#848484',
      number: '#FFFFFF',
      circle: '#FE761E',
      bg: '#FE761E'
    }
  }

  if (complete && !active) {
    return {
      color: '#FE761E',
      number: '#FE761E',
      circle: '#FE761E',
      bg: '#FFFFFF'
    }
  }

  return {
    color: '#cccccc',
    number: '#cccccc',
    circle: '#cccccc',
    bg: '#FFFFFF'
  }
}

const Steps: any = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

Steps.Step = styled.View<StepsProps>`
  align-items: center;
  justify-content: center;
`;

Steps.Circle = styled.View<StepsProps>`
  width: 30px;
  height: 30px;
  border-color: ${({active, complete}) => handleState(active, complete).circle};
  border-width: 1px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  background-color: ${({active, complete}) => handleState(active, complete).bg};
`;

Steps.Number = styled.Text<StepsProps>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${({active, complete}) => handleState(active, complete).number};
`;

Steps.Text = styled.Text<StepsProps>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: ${({active, complete}) => handleState(active, complete).color};
`;

Steps.Line = styled.View<StepsProps>`
  border-color: #cccccc;
  border-width: 1px;
  flex: 1;
  margin: 0 8px;
  position: relative;
  top: -21px;
`;

export default Steps;
