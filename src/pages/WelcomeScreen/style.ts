import styled from 'styled-components/native';

export const BgStyled = styled.ImageBackground`
    flex: 1;
    justify-content: center;
`;

export const ContainerStyled = styled.View`
    flex: 1;
    background-color: transparent;
    padding: 0 32px;
`;

export const ImageStyled = styled.Image`
    height: 110px;
    max-width: 110px;
    margin: 0 auto;
`;

export const TitleStyled = styled.Text`
    font-family: ${({ theme }) => theme.fonts.nunito.bold};
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 25px;
    color: ${({ theme }) => theme.colors.text.secondary};
    text-align: center;
    margin-bottom: 90px;
    margin-top: auto;
`;

export const SubTitleStyled = styled.Text`
    font-family: ${({ theme }) => theme.fonts.nunito.bold};
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: ${({ theme }) => theme.colors.text.primary};
    text-align: center;
    margin-top: 60px;
`;

export const CopyStyled = styled.Text`
    font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    letter-spacing: -0.032px;
    color: ${({ theme }) => theme.colors.text.copy};
    margin-top: 6px;
    margin-bottom: auto;
`;

export const NextBtnStyled = styled.Text`
    font-family: ${({ theme }) => theme.fonts.nunitosans.bold};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    color: ${({ theme }) => theme.colors.text.primary};
    padding: 16px;
`;