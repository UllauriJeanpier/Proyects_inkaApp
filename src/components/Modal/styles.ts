import React from 'react';
import styled from 'styled-components/native';
import Button from '../Button';
import Card from '../Card';

const Modal: any = styled.Modal.attrs(({ theme }) => ({
  animationType: 'slide',
  transparent: true,
}))`
  justify-content: center;
  align-items: center;
`;

const Backdrop = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: #000000;
  opacity: 0.25;
  z-index: 1;
`;

const Content = styled.View<{
  centered?: boolean;
}>`
  background-color: #ffffff;
`;

const CardModal = styled(Card)<{
  centered?: boolean;
}>`
  margin: ${({ centered }) => (centered ? 'auto' : '32px')};
`;

const Copies = styled.View`
  background-color: #ffffff;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #192d36;
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.text.copy};
`;

const Actions = styled.View`
  background-color: #ffffff;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Btn = styled(Button)`
  height: 32px;
  padding: 4px 16px;
  width: auto;
  margin: 0;
  margin-left: 8px;
`;

const Txt = styled(Button.Text)`
  font-size: 14px;
  line-height: 22px;
`;

Modal.Backdrop = Backdrop;
Modal.Card = CardModal;
Modal.Content = Content;
Modal.Copies = Copies;
Modal.Title = Title;
Modal.Description = Description;
Modal.Actions = Actions;
Modal.Button = Btn;
Modal.Button.Text = Txt;

export default Modal;
