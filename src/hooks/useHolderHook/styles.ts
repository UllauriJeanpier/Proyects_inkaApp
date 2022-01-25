import styled from 'styled-components/native';

export const TxtAdded = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
`
export const MainBtnContainer: any = styled.View`
  flex-direction: row;
  margin-bottom: 50px;
  width: 100%;
`

MainBtnContainer.ButtonLeft = styled.View`
  flex: 1;
  margin-right: 8px;
`

MainBtnContainer.ButtonRight = styled.View`
  flex: 1;
  margin-left: 8px;
`

export const HolderView: any = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
`
export const NameView = styled.View`
  flex: 1;
  flex-direction: row;  
  justify-content: space-evenly;
`

HolderView.Txt = styled.Text`
  flex: 2;
  color: #848484;
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-size: 15px;
`

export const ActionView: any = styled.View`
  flex: 1.5;
  flex-direction: row;  
  justify-content: space-evenly;
  /* background-color: blue; */
`
ActionView.Button = styled.TouchableOpacity`
  flex-direction: row;
`

ActionView.Txt = styled.Text`
  color: #848484;
  font-family: ${({ theme }) => theme.fonts.nunito.regular};
  font-size: 13px;
  margin-left: 10px;
`

export const BtnAdd = styled.TouchableOpacity<{
  actived?: boolean;
}>`
  flex-direction: row;
  width: 50%;
  justify-content: space-evenly;
  padding: 5px;
  margin-bottom: 15px;
  border-width: ${({ actived }) => !actived ? '1px' : '0px' };
  border-color: ${({ theme }) => theme.colors.buttons.secondary};
  border-radius: 10px;
`

