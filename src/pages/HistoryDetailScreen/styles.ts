import { Image } from '@components';
import styled from 'styled-components/native';

const GroupText: any = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 24px;
`;

GroupText.Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #848484;
  flex: 1;
  text-align: left;
`;

GroupText.Value = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #848484;
  flex: 1;
  text-align: left;
`;

GroupText.WithImg = styled.View`
  flex-direction: row;
`;

GroupText.Img = styled.View`
  height: 35px;
  width: 35px;
  margin-right: 12px;
  border: 1px solid #cccccc;
  justify-content: center;
  align-items: center;
`;

export { GroupText };
