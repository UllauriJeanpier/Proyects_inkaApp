import React, { FC } from 'react';
import ArrowBackStyle from './styles';
import Icon from '../Icon';

interface Props {
  onPress?: () => void;
  navigation: any;
}

const ArrowBack: FC<Props> = ({ onPress, navigation }) => {
  const tempPress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <ArrowBackStyle onPress={tempPress}>
      <Icon name="left" size={14} color="#848484" />
    </ArrowBackStyle>
  );
};

ArrowBack.defaultProps = {};

export default ArrowBack;
