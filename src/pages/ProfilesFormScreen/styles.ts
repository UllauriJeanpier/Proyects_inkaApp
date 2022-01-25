import styled from 'styled-components/native';

export const TxtTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-size: 16px;
`
export const TxtDescription = styled.Text`
  color: #848484;
  font-family: ${({ theme }) => theme.fonts.nunito.regular};
`
export const TxtSwitch = styled.Text`
  color: #848484;
  margin-left: 15px;
  text-align: justify;
  font-family: ${({ theme }) => theme.fonts.nunito.regular};
  font-size: 13px;
`

