import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import React, { Fragment, useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { View, Alert } from 'react-native';
import { RootStackParamList } from 'src/routes';

import { useAppDispatch, useTypeDocsSelector, useUserSelector } from '@hooks';
import {
  Header,
  Content,
  Input,
  Button,
  Select,
  Switch,
  Icon,
  Modal,
  Loader,
} from '@components';
import * as typeDocsActions from '@redux/actions/typeDocs';
import * as userActions from '@redux/actions/user';
import { Title, Photo, PhotoTitle, PhotoText } from './styles';
import * as userSlice from '@redux/slices/user';
import * as platforms from '@utils/platform';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileScreen'>;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const typeDocsReducer: any = useTypeDocsSelector();
  const userReducer: any = useUserSelector();
  const [visible, setVisble] = useState(false);

  useEffect(() => {
    dispatch(typeDocsActions.getTypeDocs({}));
    dispatch(userActions.getUser());
    dispatch(userActions.getImageUser());
  }, []);

  useEffect(() => {
    if (userReducer.getUser.response?.data) {
      dispatch(
        userSlice.setForm({
          phone: userReducer.getUser.response?.data?.telefono,
          typeDoc: userReducer.getUser.response?.data?.tipoDocumento,
          isPep: userReducer.getUser.response?.data?.esPep,
          parentPep: userReducer.getUser.response?.data?.parientePep,
        })
      );
    }
  }, [userReducer.getUser]);

  useEffect(() => {
    if (userReducer.getImageUser.response?.data) {
      dispatch(
        userSlice.setForm({
          image: userReducer.getImageUser.response?.data?.path,
        })
      );
    }
  }, [userReducer.getImageUser]);

  useEffect(() => {
    if (
      userReducer.getUser.response?.data &&
      typeDocsReducer.getTypeDocs.response?.data
    ) {
      dispatch(
        userSlice.setForm({
          typeDoc: userReducer.getUser.response?.data?.tipoDocumento,
        })
      );
    }
  }, [userReducer.getUser, typeDocsReducer.getTypeDocs]);

  const onPressUpdate = () => {
    dispatch(
      userActions.saveUser({
        start: () => setVisble(true),
        success: () => setVisble(true),
        error: () => Alert.alert('Error', 'Tenemos problemas'),
        finally: () => setVisble(false),
        data: {
          ...(userReducer.getUser.response?.data || {}),
          telefono: userReducer.form?.phone,
          esPep: userReducer.form?.isPep,
          parientePep: userReducer.form?.parentPep,
        },
      })
    );

    if (
      userReducer.form?.image !== userReducer.getImageUser.response?.data?.path
    ) {
      const data = new FormData();

      data.append('file1', {
        ...(userReducer.form?.image || {}),
        uri: platforms.isAndroid
          ? userReducer.form?.image.uri
          : userReducer.form?.image.uri.replace('file://', ''),
      });

      dispatch(
        userActions.saveImageUser({
          start: () => setVisble(true),
          success: () => setVisble(true),
          error: () => Alert.alert('Error', 'Tenemos problemas'),
          finally: () => setVisble(false),
          data,
        })
      );
    }
  };

  const onPressLogOut = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'LoginScreen' }],
      })
    );

  const onPressLibrary = () => {
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response?.error) {
        console.log('ImagePicker Error: ', response?.error);
      } else if (response?.customButton) {
        console.log('User tapped custom button: ', response?.customButton);
      } else {
        const source = { uri: response.uri };
        dispatch(
          userSlice.setForm({
            image: {
              name: response.fileName,
              type: response.type,
              uri: response.uri,
              size: response.fileSize,
            },
          })
        );
      }
    });
  };

  const renderPersonInfo = () => (
    <Fragment>
      <Input
        editable={false}
        placeholder="Nombre completo"
        value={userReducer.getUser.response?.data?.nombre}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Select.Content enabled={true}>
            <Select selectedValue={userReducer.form?.typeDoc} enabled={false}>
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
            editable={false}
            placeholder="Nº de Documento"
            value={userReducer.getUser.response?.data?.numeroDocumento}
          />
        </View>
      </View>
    </Fragment>
  );

  const renderCompanyInfo = () => (
    <Fragment>
      <Input
        editable={false}
        placeholder="Nombre de empresa"
        value={userReducer.getUser.response?.data?.nombre}
      />
      <Select.Content enabled={true}>
        <Select selectedValue={userReducer.form?.typeDoc} enabled={false}>
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
      <Input
        editable={false}
        placeholder="Nombre del representante"
        value={userReducer.getUser.response?.data?.nombreRepresentante}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Input
            editable={false}
            placeholder="Apellido Paterno"
            value={userReducer.getUser.response?.data?.apPaternoRepresentante}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            editable={false}
            placeholder="Apellido Materno"
            value={userReducer.getUser.response?.data?.apMaternoRepresentante}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Select.Content enabled={true}>
            <Select
              selectedValue={
                userReducer.getUser.response?.data?.tipoDocumentoRepresentante
              }
              enabled={false}
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
            editable={false}
            placeholder="Nº de Documento"
            value={
              userReducer.getUser.response?.data?.numeroDocumentoRepresentante
            }
          />
        </View>
      </View>
    </Fragment>
  );

  return (
    <>
      <Header>
        <Header.Title>Mi Perfil</Header.Title>
      </Header>
      <Content>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 32,
            alignItems: 'center',
          }}
        >
          <Photo onPress={onPressLibrary}>
            {!userReducer.form?.image ? (
              <Icon name="user" color="#FFFFFF" size={42} />
            ) : userReducer.form?.image &&
              typeof userReducer.form?.image === 'string' ? (
              (userReducer.form?.image).trim().length > 0 ? (
                <Photo.Image source={{ uri: userReducer.form?.image }} />
              ) : (
                <Icon name="user" color="#FFFFFF" size={42} />
              )
            ) : (
              <Photo.Image source={{ uri: userReducer.form?.image?.uri }} />
            )}
          </Photo>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <PhotoTitle>Fotografía</PhotoTitle>
            <PhotoText>Puedes personalizar tu cuenta con una foto.</PhotoText>
          </View>
        </View>
        <Title>Datos de cuenta</Title>
        <Input
          editable={false}
          placeholder="Email"
          value={userReducer.getUser.response?.data?.usuario}
        />
        <Title>Datos personales</Title>
        {userReducer.form?.typeDoc === 'D'
          ? renderPersonInfo()
          : renderCompanyInfo()}
        <Title>Datos de contacto</Title>
        <Input
          editable={true}
          placeholder="Celular"
          keyboardType="number-pad"
          value={userReducer.form?.phone}
          onChangeText={(text) => dispatch(userSlice.setForm({ phone: text }))}
        />
        <View style={{ marginBottom: 8 }} />
        <Switch
          toggle={userReducer.form?.isPep}
          onToggle={(toggle: boolean) =>
            dispatch(userSlice.setForm({ isPep: toggle }))
          }
        >
          ¿Eres o has sido persona expuesta politicamente (PEP)?
        </Switch>
        <View style={{ marginBottom: 24 }} />
        <Switch
          toggle={userReducer.form?.parentPep}
          onToggle={(toggle: boolean) =>
            dispatch(userSlice.setForm({ parentPep: toggle }))
          }
        >
          ¿Eres pariente, cónyuge o conviviente de alguna persona que califique
          como PEP hasta el segundo grado de consanguiniedad y segundo de
          afinidad?
        </Switch>
        <View style={{ marginBottom: 24 }} />
        <Button type="primary" onPress={onPressUpdate}>
          <Button.Text type="primary">GUARDAR</Button.Text>
        </Button>
        <Button type="secondary" onPress={onPressLogOut}>
          <Button.Text type="secondary">CERRAR SESIÓN</Button.Text>
        </Button>
        <Modal visible={visible}>
          <Modal.Backdrop />
          <Modal.Card centered style={{ elevation: 4 }}>
            <Loader />
          </Modal.Card>
        </Modal>
      </Content>
    </>
  );
};

export default ProfileScreen;
