import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, Fragment, useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { RootStackParamList } from 'src/routes';
import { useAppDispatch, useAuthSelector, useTypeDocsSelector } from '@hooks';
import {
  Button,
  Content,
  Brand,
  Copy,
  Input,
  Select,
  Modal,
  Datepicker,
  EmptyState,
  Loader,
  Checkbox,
} from '@components';
import * as authSlide from '@redux/slices/auth';
import * as authActions from '@redux/actions/auth';
import * as typeDocsActions from '@redux/actions/typeDocs';
import * as functions from '@utils/functions';
import * as constants from '@utils/constants';
import moment from 'moment';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'SignupScreen'>;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const authReducer: any = useAuthSelector();
  const typeDocsReducer: any = useTypeDocsSelector();
  const [visible, setVisble] = useState(false);
  const DocRUC = 'R';

  const logIn = useCallback(() => {
    navigation.navigate('LoginScreen');
  }, [navigation]);

  useEffect(() => {
    dispatch(authSlide.cleanForm());
    dispatch(authSlide.cleanByKey({ key: 'signUp' }));
    dispatch(typeDocsActions.getTypeDocs({}));
  }, []);

  useEffect(() => {
    if (
      !typeDocsReducer.getTypeDocs.onloading &&
      typeDocsReducer.getTypeDocs.response?.data
    ) {
      dispatch(
        authSlide.setForm({
          typeDoc: (typeDocsReducer.getTypeDocs.response?.data || [])[0].codigo,
          typeDocPerson: (typeDocsReducer.getTypeDocs.response?.data || [])[0].codigo,
        })
      );
    }
  }, [typeDocsReducer.getTypeDocs]);

  const onChangeTypeDoc = (itemValue: any) => {
    dispatch(authSlide.setForm({ typeDoc: itemValue }));
    if (itemValue === DocRUC) {
      dispatch(authSlide.setForm({ date: undefined }));
    } else {
      dispatch(
        authSlide.setForm({
          legalPerson: undefined,
          dadname: undefined,
          momname: undefined,
          typeDocPerson: undefined,
          numDocPerson: undefined,
        })
      );
    }
  };

  const validateValue = (key: any) =>
    key && (key || '').trim().length === 0 ? null : key;

  const onPressSignUp = () => {
    let payload: any = {
      cliente: {
        tipoDocumento: validateValue(authReducer.form?.typeDoc),
        numeroDocumento: validateValue(authReducer.form?.numDoc),
        nombre: validateValue(authReducer.form?.fullname),
        email: validateValue(authReducer.form?.mail),
        telefono: validateValue(authReducer.form?.phone),
        fechaNacimento:
          authReducer.form?.typeDoc !== DocRUC && authReducer.form?.date
            ? moment(new Date(authReducer.form?.date)).format(
              constants.FORMAT_DATE_BACK
            )
            : moment(new Date()).format(
              constants.FORMAT_DATE_BACK),
      },
      representante: {
        nombre: validateValue(authReducer.form?.legalPerson || ''),
        apellidoPaterno: validateValue(authReducer.form?.dadname || ''),
        apellidoMaterno: validateValue(authReducer.form?.momname || ''),
        tipoDocumento: validateValue(authReducer.form?.typeDocPerson || ''),
        numeroDocumento: validateValue(authReducer.form?.numDocPerson || ''),
      },
      password: validateValue(authReducer.form?.pass1),
      accionistas: []
    };

    if (
      functions.isEmptyText(payload.cliente.tipoDocumento) ||
      functions.isEmptyText(payload.cliente.numeroDocumento) ||
      functions.isEmptyText(payload.cliente.nombre) ||
      functions.isEmptyText(payload.cliente.email) ||
      functions.isEmptyText(payload.cliente.telefono) ||
      (payload.cliente.tipoDocumento !== DocRUC &&
        functions.isEmptyText(payload.cliente.fechaNacimento)) ||
      functions.isEmptyText(payload.password) ||
      functions.isEmptyText(authReducer.form?.pass2)
    ) {
      /* console.log(JSON.stringify(payload, null, 3)) */
      Alert.alert('Error', 'Ingrese todos los campos por favor');
      return;
    }

    if (
      payload.cliente.tipoDocumento === DocRUC &&
      (functions.isEmptyText(payload.representante.nombre) ||
        functions.isEmptyText(payload.representante.apellidoPaterno) ||
        functions.isEmptyText(payload.representante.apellidoMaterno) ||
        functions.isEmptyText(payload.representante.tipoDocumento) ||
        functions.isEmptyText(payload.representante.numeroDocumento))
    ) {
      Alert.alert('Error', 'Ingrese los datos del representante');
      return;
    }

    if (!functions.validateEmail(payload.cliente.email)) {
      Alert.alert('Error', 'Escriba correctamente su correo');
      return;
    }

    if (
      !functions.validatePassword(authReducer.form?.pass2) ||
      !functions.validatePassword(payload.password) ||
      payload.password !== authReducer.form?.pass2
    ) {
      Alert.alert(
        'Error',
        'La contraseña no cumple con una mayuscula, una minuscula y un simbolo, verifique que ambas esten escritas correctamente'
      );
      return;
    }

    if (!authReducer.form?.checked) {
      Alert.alert('Error', 'Debe aceptar los terminos y condiciones');
      return;
    }

    if (payload.cliente.tipoDocumento !== DocRUC){
      console.log(JSON.stringify(payload, null, 3))
      dispatch(
        authActions.signUp({
          start: () => setVisble(true),
          error: () => Alert.alert('Error', 'Tenemos problemas'),
          success: () => null,
          finally: () => setVisble(false),
          data: payload,
        })
      );
    } else {
      navigation.navigate('ShareHolderScreen', {payload})
    }
  };

  const findDoc = (value: string) => 
    (typeDocsReducer.getTypeDocs.response?.data || []).find(
      (row: any) => row?.codigo === value
    );

  if (
    !authReducer.signUp.onloading &&
    authReducer.signUp.response &&
    authReducer.signUp.response?.success
  ) {
    return (
      <Content centered>
        <EmptyState>
          <EmptyState.Icon name="checkcircleo" size={90} color="#52C41A" />
          <EmptyState.Title>REGISTRO EXITOSO</EmptyState.Title>
          <EmptyState.Subtitle>
            Hemos enviado un correo de verificación, haga clic en enlace para
            confirmar tu cuenta.
          </EmptyState.Subtitle>
          <EmptyState.Button type="primary" onPress={logIn}>
            <EmptyState.Button.Text>OK</EmptyState.Button.Text>
          </EmptyState.Button>
        </EmptyState>
      </Content>
    );
  }

  const renderRep = () => {
    if (authReducer.form?.typeDoc === DocRUC) {
      return (
        <Fragment>
          <Input
            editable={true}
            value={authReducer.form?.company}
            onChangeText={(text) =>
              dispatch(authSlide.setForm({ company: text }))
            }
            placeholder="Nombre de la empresa"
          />
          <Input
            editable={true}
            value={authReducer.form?.legalPerson}
            onChangeText={(text) =>
              dispatch(authSlide.setForm({ legalPerson: text }))
            }
            placeholder="Nombre del representante legal"
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Input
                editable={true}
                value={authReducer.form?.dadname}
                onChangeText={(text) =>
                  dispatch(authSlide.setForm({ dadname: text }))
                }
                placeholder="Apellido paterno"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                editable={true}
                value={authReducer.form?.momname}
                onChangeText={(text) =>
                  dispatch(authSlide.setForm({ momname: text }))
                }
                placeholder="Apellido materno"
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Select.Content>
                <Select
                  selectedValue={authReducer.form?.typeDocPerson}
                  onValueChange={(itemValue: any) =>
                    dispatch(authSlide.setForm({ typeDocPerson: itemValue }))
                  }
                >
                  {(typeDocsReducer.getTypeDocs.response?.data || []).map(
                    (row: any) => (
                      <Select.Item
                        key={row.codigo}
                        label={row.nombre}
                        value={row.codigo}
                      />
                    )
                  )}
                </Select>
              </Select.Content>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                editable={true}
                value={authReducer.form?.numDocPerson}
                onChangeText={(text) =>
                  dispatch(authSlide.setForm({ numDocPerson: text }))
                }
                placeholder="Nº de Documento"
                maxLength={findDoc(authReducer.form?.typeDocPerson)?.longitud}
              />
            </View>
          </View>
        </Fragment>
      );
    }

    return null;
  };

  return (
    <Content centered>
      <Brand />
      <Copy>
        ¿Eres nuevo en <Copy type="primary">Inkambio</Copy>?
      </Copy>
      <Copy>Crea una cuenta con tu email</Copy>
      <View style={{ marginBottom: 32 }} />
      <Input
        editable={true}
        value={authReducer.form?.fullname}
        onChangeText={(text) => dispatch(authSlide.setForm({ fullname: text }))}
        placeholder="Nombre completo"
      />
      <Input
        editable={true}
        value={authReducer.form?.mail}
        onChangeText={(text) => dispatch(authSlide.setForm({ mail: text }))}
        placeholder="Correo electrónico"
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1.5, marginRight: 16 }}>
          <Select.Content enabled={false}>
            <Select enabled>
              <Select.Item label="+51" value="+51" />
            </Select>
          </Select.Content>
        </View>
        <View style={{ flex: 2 }}>
          <Input
            editable={true}
            value={authReducer.form?.phone}
            onChangeText={(text) =>
              dispatch(authSlide.setForm({ phone: text }))
            }
            placeholder="Telefono"
            keyboardType="number-pad"
            maxLength={9}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1.5, marginRight: 16 }}>
          <Select.Content>
            <Select
              selectedValue={authReducer.form?.typeDoc}
              onValueChange={onChangeTypeDoc}
            >
              {(typeDocsReducer.getTypeDocs.response?.data || []).map(
                (row: any) => (
                  <Select.Item
                    key={row.codigo}
                    label={row.nombre}
                    value={row.codigo}
                  />
                )
              )}
            </Select>
          </Select.Content>
        </View>
        <View style={{ flex: 2 }}>
          <Input
            editable={true}
            value={authReducer.form?.numDoc}
            onChangeText={(text) =>
              dispatch(authSlide.setForm({ numDoc: text }))
            }
            placeholder="Documento"
            maxLength={findDoc(authReducer.form?.typeDoc)?.longitud}
          />
        </View>
      </View>
      <Datepicker
        disabled={authReducer.form?.typeDoc === DocRUC}
        value={
          authReducer.form?.date 
            ? new Date(authReducer.form?.date) 
            : new Date()
        }
        onChange={(e: any, date: any) =>
          dispatch(authSlide.setForm({ date: date.toString() }))
        }
        placeholder="Fecha de nacimiento"
      />
      {renderRep()}
      <Input
        editable={true}
        value={authReducer.form?.pass1}
        onChangeText={(text) => dispatch(authSlide.setForm({ pass1: text }))}
        placeholder="Contraseña"
        secureTextEntry
      />
      <Input
        editable={true}
        value={authReducer.form?.pass2}
        onChangeText={(text) => dispatch(authSlide.setForm({ pass2: text }))}
        placeholder="Repite contraseña"
        secureTextEntry
      />
      <Checkbox
        checked={authReducer.form?.checked}
        onPress={(checked) => dispatch(authSlide.setForm({ checked }))}
      >
        Al crear una cuenta acepto los términos y condiciones y la política de
        privacidad
      </Checkbox>
      <View style={{ marginBottom: 10 }} />
      <Button type="primary" onPress={onPressSignUp}>
        <Button.Text type="primary">SIGUIENTE</Button.Text>
      </Button>
      <Copy>
        ¿Ya tienes una cuenta?{' '}
        <Copy type="primary" onPress={logIn}>
          Iniciar sesión
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

export default SignupScreen;
