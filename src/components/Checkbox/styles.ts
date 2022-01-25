import { ThemedStyledProps } from 'styled-components';
import styled, { ThemeProps } from 'styled-components/native';

type CheckboxStyleProps = {
  checked?: boolean;
  disabled?: boolean;
};

const handleState = (theme: any, disabled: any, checked: any) => {
  if (disabled) {
    return {
      border: '#CCCCCC',
      backgroundBox: '#CCCCCC',
    };
  }

  if (checked) {
    return {
      border: '#FE761E',
      backgroundBox: '#FE761E',
    };
  }

  return {
    border: '#CCCCCC',
    backgroundBox: '#FFFFFF',
  };
};

const CheckboxStyle = styled.Pressable<CheckboxStyleProps>`
  display: flex;
  flex-direction: row;
`;

const CheckboxDisabledStyle = styled.View<CheckboxStyleProps>`
  display: flex;
  flex-direction: row;
`;

const CheckboxBoxStyle = styled.View<CheckboxStyleProps>`
  height: 24px;
  width: 24px;
  border-radius: 5px;
  background-color: ${({ theme, disabled, checked }) =>
    handleState(theme, disabled, checked).backgroundBox};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, disabled, checked }) =>
    handleState(theme, disabled, checked).border};
  align-items: center;
  justify-content: center;
`;

const CheckboxLabelStyle = styled.Text<CheckboxStyleProps>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  color: #848484;
  font-size: 15px;
  line-height: 20px;
  margin-left: 28px;
  flex-wrap: wrap;
  flex: 1;
`;

export {
  CheckboxStyle,
  CheckboxDisabledStyle,
  CheckboxBoxStyle,
  CheckboxLabelStyle,
};
