import React from 'react';
import styled from 'styled-components/native';

const DatepickerPress: any = styled.TouchableOpacity`
  background-color: #ffffff;
  text-align: center;
  color: #ffffff;
  height: 50px;
  width: 100%;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 6px 12px;
  margin-bottom: 16px;
`;

const DatepickerDisabled = styled.View`
  background-color: #F6F6F6;
  text-align: center;
  color: #ffffff;
  height: 50px;
  width: 100%;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 6px 12px;
  margin-bottom: 16px;
`;

const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.copy};
`;

const Placeholder = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: left;
  color: #cccccc;
`;

DatepickerPress.Text = Text;
DatepickerPress.Placeholder = Placeholder;
DatepickerPress.Disabled = DatepickerDisabled;

export default DatepickerPress;
