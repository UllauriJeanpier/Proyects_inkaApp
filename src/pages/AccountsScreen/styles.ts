import styled from 'styled-components/native';
import { Button } from '@components';

const AccountItem: any = styled.View`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  border-bottom-color: #cccccc;
  border-bottom-width: 1px;
  padding-bottom: 16px;
  padding-top: 16px;
`;

const AccountImg = styled.View`
  height: 35px;
  width: 35px;
  margin-right: 24px;
  border: 1px solid #cccccc;
  justify-content: center;
  align-items: center;
`;

const AccountContent = styled.View`
  flex: 1;
`;

const AccountTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #192d36;
  margin-bottom: 12px;
`;

const AccountLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #848484;
`;

const AccountValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #848484;
`;

const AccountActions = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-left: 16px;
`;

const AccountButton = styled(Button)`
  border-radius: 100px;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

AccountItem.Img = AccountImg;
AccountItem.Content = AccountContent;
AccountItem.Title = AccountTitle;
AccountItem.Label = AccountLabel;
AccountItem.Value = AccountValue;
AccountItem.Actions = AccountActions;
AccountItem.Action = AccountButton;

export default AccountItem;
