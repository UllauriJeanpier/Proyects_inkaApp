import styled from 'styled-components/native';
import { PickerProps } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import React from 'react';

const Select: any = styled(RNPicker).attrs(({ theme }) => ({}))`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 6px;
  line-height: 22px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.copy};
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: transparent;
`;

Select.Content = styled.View<{
  enabled?: boolean;
}>`
  border: 1px solid #cccccc;
  border-radius: 6px;
  margin-bottom: 16px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${({ enabled }) => (enabled ? '#f6f6f6' : '#FFFFFF')};
`;

Select.Item = styled(RNPicker.Item).attrs(({ theme }) => ({
  // size: "large",
  // color: theme.colors.primary
}))`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: left;
`;

Select.Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.copy};
  margin-bottom: 8px;
`;

export default Select;
