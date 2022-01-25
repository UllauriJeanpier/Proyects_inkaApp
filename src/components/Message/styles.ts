import styled from 'styled-components/native';

const Message: any = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 24px;
`;

Message.Icon = styled.View`
  width: 24px;
  margin-bottom: auto;
  margin-top: 4px;
`;

Message.Text = styled.Text<{
  strong?: boolean;
}>`
  font-family: ${({ theme, strong }) =>
    strong ? theme.fonts.nunito.bold : theme.fonts.nunito.regular};
  font-style: normal;
  font-weight: ${({ strong }) => (strong ? 'bold' : 'normal')};
  font-size: 14px;
  line-height: 22px;
  color: #848484;
  text-align: left;
`;

export default Message;