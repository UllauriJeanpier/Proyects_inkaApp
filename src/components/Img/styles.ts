import styled from 'styled-components/native';

type Props = {
    width?: number;
    height?: number;
}

const Img: any = styled.Image<Props>`
    width: ${({ width }) => width ? `${width}px`: '100%'};
    height: ${({ height }) => height ? `${height}px`: '100%'};
`;

export default Img;