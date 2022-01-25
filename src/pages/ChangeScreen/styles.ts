import styled from 'styled-components/native';
import { Input } from '@components';

// STEP 1
const StepTitle: any = styled.Text<{
  dark?: boolean;
  light?: boolean;
  primary?: boolean;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: string;
  centered?: boolean;
}>`
  font-family: ${({ theme, light }) =>
    light ? theme.fonts.nunitosans.regular : theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: ${({ theme, light }) => (light ? 'normal' : 'bold')};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : '22px')};
  color: ${({ theme, dark, light, primary }) =>
    light ? '#848484' : dark ? '#192D36' : primary ? '#FE761E' : '#36798C'};
  text-align: ${({ textAlign }) => (textAlign ? `${textAlign}` : 'left')};
  ${({ centered }) =>
    centered
      ? `align-items: center;
  justify-content: center;`
      : ''}
`;

const InputLabel: any = styled.View`
  width: 100%;
  margin-bottom: 12px;
  flex-direction: row;
  height: 55px;
`;

InputLabel.Input = styled(Input)`
  border-right-width: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin: 0;
  flex: 1;
  height: 55px;
`;

InputLabel.Label = styled.View`
  margin: 0;
  height: 55px;
  background-color: #36798c;
  width: 84px;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

InputLabel.LabelText = styled.Text`
  margin: 0;
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
`;

const FloatingRoundButtton: any = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  margin: 0;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 55px;
  top: 40px;
  z-index: 4;
`;

FloatingRoundButtton.Opacity = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  position: absolute;
  z-index: 0;
  background: #192d36;
  opacity: 0.6;
`;

FloatingRoundButtton.Content = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Line = styled.View`
  border-color: #cccccc;
  border-width: 0.5px;
  flex: 1;
  margin: 24px 0;
`;

export { StepTitle, InputLabel, FloatingRoundButtton, Line };
