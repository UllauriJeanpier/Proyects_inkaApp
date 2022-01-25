import { RouteProp } from '@react-navigation/native';
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
  navigation: StackNavigationProp<RootStackParamList, 'ChangePasswordScreen'>;
  route: RouteProp<RootStackParamList, 'ChangePasswordScreen'>;
}

const ChangePasswordScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const authReducer: any = useAuthSelector();
  const [visible, setVisble] = useState(false);

  useEffect(() => {
    dispatch(authSlide.cleanForm());
    dispatch(authSlide.cleanByKey({ key: 'changePassword' }));
  }, []);

  const logIn = useCallback(() => {
    navigation.navigate('LoginScreen');
  }, [navigation]);

  const onPressChangePassword = () => {
    const payload = {
      password: authReducer.form?.password,
      password2: authReducer.form?.password2,
      token: route?.params.token,
      email: route?.params.mail,
    };

    if (
      functions.isEmptyText(payload.password) ||
      functions.isEmptyText(payload.password2) ||
      payload.password !== payload.password2
    ) {
      Alert.alert('Error', 'Ingrese su contraseña correctamente');
    } else {
      dispatch(
        authActions.changePassword({
          start: () => setVisble(true),
          error: () => Alert.alert('Error', 'Tenemos problemas'),
          success: () => null,
          finally: () => setVisble(false),
          data: payload,
        })
      );
    }
  };

  if (
    !authReducer.changePassword.onloading &&
    authReducer.changePassword.response &&
    authReducer.changePassword.response?.success
  ) {
    return (
      <Content centered>
        <EmptyState>
          <EmptyState.Icon name="checkcircleo" size={90} color="#52C41A" />
          <EmptyState.Title>CONTRASEÑA RESTABLECIDA</EmptyState.Title>
          <EmptyState.Subtitle>
            Tu contraseña ha sido restablecida con éxito.
          </EmptyState.Subtitle>
          <EmptyState.Button type="primary" onPress={logIn}>
            <EmptyState.Button.Text type="primary">CONTINUAR</EmptyState.Button.Text>
          </EmptyState.Button>
        </EmptyState>
      </Content>
    );
  }

  return (
    <Content centered>
      <Brand />
      <Copy weight="bold">Cambiar contraseña</Copy>
      <View style={{ marginBottom: 10 }} />
      <Input
        editable={true}
        placeholder="Nueva contraseña"
        value={authReducer.form?.password}
        onChangeText={(text) => dispatch(authSlide.setForm({ password: text }))}
        secureTextEntry
      />
      <Input
        editable={true}
        placeholder="Repetir contraseña"
        value={authReducer.form?.password2}
        onChangeText={(text) =>
          dispatch(authSlide.setForm({ password2: text }))
        }
        secureTextEntry
      />
      <Button type="primary" onPress={onPressChangePassword}>
        <Button.Text type="primary">GUARDAR</Button.Text>
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

export default ChangePasswordScreen;
