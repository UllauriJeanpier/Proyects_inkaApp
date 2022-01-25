import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { RootStackParamList } from 'src/routes';
import {
  Content,
  Brand,
  Copy,
  Input,
  Button,
  Modal,
  Loader,
} from '@components';
import { useAppDispatch, useAuthSelector } from '@hooks';
import * as authSlide from '@redux/slices/auth';
import * as authActions from '@redux/actions/auth';
import * as functions from '@utils/functions';
import * as storage from '@utils/storage';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const authReducer: any = useAuthSelector();
  const [visible, setVisble] = useState(false);

  useEffect(() => {
    dispatch(authSlide.cleanForm());
    dispatch(authSlide.cleanByKey({ key: 'logIn' }));
    storage.clean();
  }, []);

  const signUp = useCallback(() => {
    navigation.navigate('SignupScreen');
  }, [navigation]);

  const recoverPassword = useCallback(() => {
    navigation.navigate('RecoverPasswordScreen');
  }, [navigation]);

  const onPressLogIn = () => {
    const payload = {
      username: authReducer.form?.mail,
      password: authReducer.form?.pass,
    };

    if (
      functions.isEmptyText(payload.username) ||
      functions.isEmptyText(payload.password)
    ) {
      Alert.alert('Error', 'Ingrese su usuario y contraseña');
    } else {
      dispatch(
        authActions.logIn({
          start: () => setVisble(true),
          success: () => navigation.navigate('ProfilesScreen'),
          error: () => Alert.alert('Error', 'Tenemos problemas'),
          finally: () => setVisble(false),
          data: payload,
        })
      );
    }
  };

  return (
    <Content centered>
      <Brand />
      <Copy>!Bienvenido de nuevo¡</Copy>
      <View style={{ marginBottom: 32 }} />
      <Input
        editable={true}
        placeholder="Correo electrónico"
        value={authReducer.form?.email}
        onChangeText={(text) => dispatch(authSlide.setForm({ mail: text }))}
      />
      <Input
        editable={true}
        placeholder="Contraseña"
        value={authReducer.form?.pass}
        onChangeText={(text) => dispatch(authSlide.setForm({ pass: text }))}
        secureTextEntry
      />
      <View style={{ marginBottom: 10 }} />
      <Button type="primary" onPress={onPressLogIn}>
        <Button.Text type="primary">INICIAR SESIÓN</Button.Text>
      </Button>
      <Button type="link" onPress={recoverPassword}>
        <Button.Text type="link">¿Olvidaste tu contraseña?</Button.Text>
      </Button>
      <Copy>
        ¿No tienes una cuenta?{' '}
        <Copy type="primary" onPress={signUp}>
          Regístrate
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

export default LoginScreen;
