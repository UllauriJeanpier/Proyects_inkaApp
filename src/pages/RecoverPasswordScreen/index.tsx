import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { RootStackParamList } from 'src/routes';
import {
  Content,
  Brand,
  Copy,
  Input,
  Button,
  Modal,
  Loader,
  EmptyState,
} from '@components';
import { useAppDispatch, useAuthSelector } from '@hooks';
import * as authSlide from '@redux/slices/auth';
import * as authActions from '@redux/actions/auth';
import * as functions from '@utils/functions';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'RecoverPasswordScreen'>;
}

const RecoverPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const authReducer: any = useAuthSelector();
  const [visible, setVisble] = useState(false);

  useEffect(() => {
    dispatch(authSlide.cleanForm());
    dispatch(authSlide.cleanByKey({ key: 'forgetPassword' }));
  }, []);

  const logIn = useCallback(() => {
    navigation.navigate('LoginScreen');
  }, [navigation]);

  const onPressRecoverPassword = () => {
    const payload = {
      email: authReducer.form?.mail,
    };

    if (functions.isEmptyText(payload.email)) {
      Alert.alert('Error', 'Ingrese su usuario');
    } else {
      dispatch(
        authActions.forgetPassword({
          start: () => setVisble(true),
          error: () => Alert.alert('Error', 'Tenemos problemas'),
          finally: () => setVisble(false),
          success: () => null,
          data: payload,
        })
      );
    }
  };

  if (
    !authReducer.forgetPassword.onloading &&
    authReducer.forgetPassword.response &&
    authReducer.forgetPassword.response?.success
  ) {
    return (
      <Content centered>
        <EmptyState>
          <EmptyState.Icon name="checkcircleo" size={90} color="#52C41A" />
          <EmptyState.Title>VERIFICA TU EMAIL</EmptyState.Title>
          <EmptyState.Subtitle>
            Hemos enviado instrucciones para recuperar la contraseña a tu
            corrreo electrónico.
          </EmptyState.Subtitle>
          <EmptyState.Button type="primary" onPress={logIn}>
            <EmptyState.Button.Text type="primary">OK</EmptyState.Button.Text>
          </EmptyState.Button>
        </EmptyState>
      </Content>
    );
  }

  return (
    <Content centered>
      <Brand />
      <Copy weight="bold">Recupera tu contraseña</Copy>
      <View style={{ marginBottom: 10 }} />
      <Input
        editable={true}
        placeholder="Correo electrónico"
        value={authReducer.form?.email}
        onChangeText={(text) => dispatch(authSlide.setForm({ mail: text }))}
      />
      <Button type="primary" onPress={onPressRecoverPassword}>
        <Button.Text type="primary">ENVIAR</Button.Text>
      </Button>
      <Copy size="sm">
        ¿Ya recuerdas tu contraseña?{' '}
        <Copy size="sm" type="primary" onPress={logIn}>
          Inicia Sesión
        </Copy>
      </Copy>
      <Modal visible={visible}>
        <Modal.Backdrop />
        <Modal.Card centered style={{ elevation: 4 }}>
          <Loader />
        </Modal.Card>
      </Modal>
    </Content>
  );
};

export default RecoverPasswordScreen;
