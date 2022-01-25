import React, {FC} from 'react';
import {ImageStyled} from './styles';
import logo from '@assets/image/logo.png'

interface Props {}

const Brand: FC<Props> = () => (
    <ImageStyled source={logo} />
);

Brand.defaultProps = {};

export default Brand;
