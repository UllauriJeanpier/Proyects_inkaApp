import React from 'react'
import styled from 'styled-components/native';
import Btn from '../Button';
import Icon from '../Icon';

const EmptyState: any = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
`; 

const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.nunito.bold};
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #192D36;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 8px;
`;

const Subtitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    color: ${({ theme }) => theme.colors.text.copy};
    text-align: center;
`;

const ESIcon = styled(Icon)`
    margin-bottom: 36px;
`;

const Button = styled(Btn)`
    width: 100%;
    margin-top: 48px;
`;

EmptyState.Title = Title;
EmptyState.Subtitle = Subtitle;
EmptyState.Icon = ESIcon;
EmptyState.Button = Button;

export default EmptyState;