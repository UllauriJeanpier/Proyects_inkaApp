import styled from 'styled-components/native';

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
  text-align: left;
  color: #848484;
  margin-bottom: 56px;
  text-align: center;
`;

const RowContent = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const RowProfile: any = styled.TouchableOpacity<{
  company?: boolean;
  add?: boolean;
}>`
  width: 130px;
  height: 130px;
  background-color: ${({ company, add }) =>
    add ? '#FFFFFF' : !company ? '#36798c' : '#C4C4C4'};
  border-width: 3px;
  border-color: ${({ company, add }) =>
    add ? '#CCCCCC' : !company ? '#36798c' : '#C4C4C4'};
  border-radius: 5px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
`;

RowProfile.Title = styled.Text<{
  add?: boolean;
}>`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: ${({ add }) => (add ? '#CCCCCC' : '#36798c')};
`;

RowProfile.SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  color: #848484;
  text-transform: uppercase;
`;

RowProfile.Content = styled.View`
  width: 130px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 30px;
`;

RowProfile.Img = styled.Image`
  width: 64px;
  height: 64px;
`;

export { Title, RowContent, RowProfile };
