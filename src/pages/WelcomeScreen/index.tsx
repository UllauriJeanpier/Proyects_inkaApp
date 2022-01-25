import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { RootStackParamList } from 'src/routes';
import {
  ContainerStyled,
  TitleStyled,
  SubTitleStyled,
  CopyStyled,
  ImageStyled,
  BgStyled,
  NextBtnStyled
} from './style'

import slide1 from '@assets/image/icon_recibe_cambio.png';
import slide2 from '@assets/image/icon_recibe_cambio.png';
import slide3 from '@assets/image/icon_recibe_cambio.png';
import bg from '@assets/image/background.png';
import {Content} from '@components';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'WelcomeScreen'>;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const logIn = useCallback(() => {
    navigation.navigate('LoginScreen');
  }, [navigation]);

  const slides = [
    {
      key: 1,
      title: 'CAMBIA DINERO EN\nSIMPLES PASOS',
      subtitle: 'REGISTRA TU OPERACIÓN',
      copy: 'Indica el monto que deseas cambiar y las cuentas de origen y destino.',
      image: slide1,
    },
    {
      key: 2,
      title: 'CAMBIA DINERO EN\nSIMPLES PASOS',
      subtitle: 'TRANSFIERE A INKAMBIO',
      copy: 'Entra a tu banca por internet y realizar una transferencia a Inkambio por el monto indicado.',
      image: slide2,
    },
    {
      key: 3,
      title: 'CAMBIA DINERO EN\nSIMPLES PASOS',
      subtitle: 'RECIBE TU CAMBIO',
      copy: 'Inkambio transferirá el dinero en tu cuenta de destino.',
      image: slide3,
    },
  ];

 const _renderItem = (row: any) => {
   const { item } = row;

    return (
      <ContainerStyled>
        <TitleStyled>{item.title}</TitleStyled>
        <ImageStyled source={item.image} />
        <SubTitleStyled>{item.subtitle}</SubTitleStyled>
        <CopyStyled>{item.copy}</CopyStyled>
      </ContainerStyled>
    );
  }

  const styleDot = {
    backgroundColor: 'transparent',
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 8
  }

  const renderDoneButton = () => <NextBtnStyled>Siguiente</NextBtnStyled>

  return (
    <Content hasPadding={false}>
      <BgStyled source={bg}>
        <AppIntroSlider
          renderItem={_renderItem}
          data={slides}
          dotStyle={{
            ...styleDot,
            borderColor: '#CCCCCC',
            borderStyle: 'solid',
            borderWidth: 2,
          }}
          activeDotStyle={{
            ...styleDot,
            backgroundColor: '#FE761E'
          }}
          renderDoneButton={renderDoneButton}
          onDone={logIn}
        />
      </BgStyled>
    </Content>
  );
};

export default WelcomeScreen;
