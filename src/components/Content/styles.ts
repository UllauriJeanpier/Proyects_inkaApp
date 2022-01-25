import styled from 'styled-components/native';

export const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
    display: flex;
    flex: 1;
    background-color: #FFFFFF;
`;

interface Props {
    hasPadding?: boolean;
    centered?: boolean;
}

export const StyledSafeAreaView = styled.SafeAreaView<Props>`
    display: flex;
    flex: 1;
    background-color: #FFFFFF;
    ${({ centered }) => !centered ? '' : `
        justify-content: center;
        align-items: center;
    `}
    padding: ${({ hasPadding }) => !hasPadding ? '0px' : '24px' };
`;

export const StatusBarStyled = styled.StatusBar.attrs(({theme}) => ({
    backgroundColor: '#FFFFFF'
  }))`
`;