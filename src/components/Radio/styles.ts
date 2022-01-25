import styled from 'styled-components/native';

type RadioStyleProps = {
  checked?: boolean;
  disabled?: boolean;
  bold?: boolean;
};

const handleState = (theme: any, disabled: any, checked: any) => {
  if (disabled) {
    return {
      border: '#CCCCCC',
      backgroundBox: '#FFFFFF',
      checked: '#CCCCCC',
    };
  }

  if (checked) {
    return {
      border: '#CCCCCC',
      backgroundBox: '#FFFFFF',
      checked: '#FE761E',
    };
  }

  return {
    border: '#CCCCCC',
    backgroundBox: '#FFFFFF',
    checked: '#FFFFFF',
  };
};

const RadioStyle = styled.Pressable<RadioStyleProps>`
  display: flex;
  flex-direction: row;
`;

const RadioDisabledStyle = styled.View<RadioStyleProps>`
  display: flex;
  flex-direction: row;
`;

const RadioBoxStyle = styled.View<RadioStyleProps>`
  height: 18px;
  width: 18px;
  border-radius: 24px;
  padding: 3px;
  background-color: ${({ theme, disabled, checked }) =>
    handleState(theme, disabled, checked).backgroundBox};
  border-width: 1px;
  border-style: solid;
  border-color: #cccccc;
  align-items: center;
  justify-content: center;
`;

const RadioBoxCheckedStyle = styled.View<RadioStyleProps>`
  height: 10px;
  width: 10px;
  border-radius: 20px;
  margin: auto;
  background-color: ${({ theme, disabled, checked }) =>
    handleState(theme, disabled, checked).checked};
`;

const RadioLabelStyle = styled.Text<RadioStyleProps>`
  font-family: ${({ theme, bold }) =>
    bold ? theme.fonts.nunito.bold : theme.fonts.nunitosans.regular};
  font-weight: ${({ theme, bold }) => (bold ? 'bold' : 'normal')};
  font-style: normal;
  color: #848484;
  font-size: 15px;
  line-height: 20px;
  margin-left: 16px;
  flex-wrap: wrap;
  flex: 1;
`;

export {
  RadioStyle,
  RadioDisabledStyle,
  RadioBoxCheckedStyle,
  RadioBoxStyle,
  RadioLabelStyle,
};
