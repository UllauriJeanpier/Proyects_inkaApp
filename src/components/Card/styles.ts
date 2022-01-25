import styled from 'styled-components/native';

const Card: any = styled.View`
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(128, 135, 137, 0.12);
  border-radius: 10px;
  padding: 20px;
  z-index: 2;
  margin: 0;
  margin-bottom: 24px;
  flex-direction: column;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  background: #FFFFFF;
`;

Card.Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`;

Card.Body = styled.View`
  width: 100%;
  flex: 1;
  padding: 0;
  margin: 0;
`;

Card.Footer = styled.View`
  width: 100%;
  padding: 0;
  margin: 0;
`;

Card.Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #848484;
  flex: 1;
  text-align: left;
`;

Card.Menu = styled.TouchableOpacity`
  margin-left: 16px;
`;

export default Card;
