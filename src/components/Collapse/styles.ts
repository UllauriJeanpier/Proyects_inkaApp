import styled from 'styled-components/native';

const Collapse: any = styled.View`
  background-color: #ffffff;
  margin-bottom: 24px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const CollapseHeader = styled.View`
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const CollapseText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
`;

const CollapseArrow = styled.TouchableOpacity`
  margin-right: 16px;
`;

const CollapseContent: any = styled.View`
  background-color: #ffffff;
  margin-bottom: 24px;
  width: 100%;
`;

Collapse.Text = CollapseText;
Collapse.Header = CollapseHeader;
Collapse.Arrow = CollapseArrow;
Collapse.Content = CollapseContent;

export default Collapse