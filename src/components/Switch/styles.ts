import styled from 'styled-components/native';
import { Animated } from 'react-native';

interface StyleProps {
  toggle?: boolean;
  disabled?: boolean;
}

const Switch: any = styled.View<StyleProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

Switch.Pressable = styled.Pressable<StyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  width: 40px;
  height: 24px;
  border-radius: 1000px;
  border-width: 1px;
  border-style: solid;
`;

Switch.Circle = styled(Animated.View)<StyleProps>`
  width: 16px;
  height: 16px;
  border-radius: 1000px;
`;

Switch.Text = styled.Text<StyleProps>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  color: #848484;
  font-size: 15px;
  line-height: 22px;
  margin-left: 8px;
  flex-wrap: wrap;
  flex: 1;
`;

export default Switch;
