import React from 'react'
import styled from 'styled-components/native';
import Btn from '../Button';
import ArrowBack from '../ArrowBack';

interface Props {
    internal?: boolean;
}

const Header: any = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 86px;
    background-color: #FFFFFF;
    border-bottom-width: 1px;
    border-bottom-color: #EBF0FF;
    padding: 16px 20px;
`; 

const Title = styled.Text<Props>`
    font-family: ${({ theme }) => theme.fonts.nunito.bold};
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 27px;
    color: ${({ internal }) => !internal ? '#223263' : '#192D36'};
    text-align: left; 
    letter-spacing: 0.5px;
`;

const Button = styled(Btn)`
    width: 28px;
    height: 28px;
    margin-right: 4px;
`;

Header.Title = Title;
Header.Button = Button;
Header.ArrowBack = ArrowBack;

export default Header;