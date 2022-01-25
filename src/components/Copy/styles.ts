import styled from 'styled-components/native';

interface Props {
    type?: 'primary' | 'secondary';
    size?: 'sm';
    weight?: 'bold' | 'normal'
}

export default styled.Text<Props>`
    font-family: ${({ theme, type, weight }) => type || weight === 'bold' ? theme.fonts.nunitosans.bold : theme.fonts.nunitosans.regular};
    font-style: normal;
    font-weight: ${({ weight }) => weight ? 'bold' : 'normal'};
    font-weight: ${({ type }) => type ? 'bold' : 'normal'};
    font-size: ${({ size }) => size === 'sm' ? '16px' : '18px'};
    line-height: 25px;
    letter-spacing: ${({ size }) => size === 'sm' ? '0' : '-0.032px'};
    text-align: center;
    color: ${({ theme, type }) => type ? theme.colors.text[type] : theme.colors.text.copy};
`; 