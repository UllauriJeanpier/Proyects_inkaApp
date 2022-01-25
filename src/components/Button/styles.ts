import React from 'react';
import styled from 'styled-components/native';

interface PropsBtn {
  type: 'primary' | 'secondary' | 'link' | 'default' | 'outline';
}

const Button: any = styled.TouchableOpacity<PropsBtn>`
  background-color: ${({ theme, type }) => theme.colors.buttons[type]};
  text-align: center;
  color: #ffffff;
  height: 50px;
  width: 100%;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: ${({ type }) =>
    type === 'default' || type === 'outline' ? '1px' : '0px'};
  border-color: ${({ type }) =>
    type === 'default'
      ? '#D9D9D9'
      : type === 'outline'
      ? '#FE761E'
      : 'transparent'};
`;

const handleColorText = (theme: any, type: any) => {
  if (type === 'primary' || type === 'secondary') {
    return '#FFFFFF';
  } else if (type === 'outline') {
    return '#FE761E';
  } else if (type === 'default') {
    return '#36798C';
  } else {
    return theme.colors.text.copy;
  }
};

const Text = styled.Text<PropsBtn>`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: ${({ type }) => (type === 'outline' ? '14px' : '16px')};
  line-height: ${({ type }) => (type === 'outline' ? '19px' : '25px')};
  text-align: center;
  color: ${({ theme, type }) => handleColorText(theme, type)};
`;

Button.Text = Text;

export default Button;
