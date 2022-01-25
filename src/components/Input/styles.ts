import styled from 'styled-components/native';

export default styled.TextInput.attrs(({theme}) => ({
    placeholderColor: '#CCCCCC'
  }))`
    font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: left;
    color: ${({ theme }) => theme.colors.text.copy};
    height: 50px;
    width: 100%;
    border: 1px solid #CCCCCC;
    border-radius: 6px;
    padding: 6px 12px;
    margin-bottom: 16px;
    background-color: ${({ editable }) => editable ? '#FFFFFF' : '#F6F6F6'};
`; 