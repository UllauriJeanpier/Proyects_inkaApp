import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState, useEffect, Fragment } from 'react';
import {
  useAccountsSelectorHooks,
  useAppDispatch,
  useBankSelector,
  useTypeDocsSelector,
} from '@hooks';
import * as accountsActions from '@redux/actions/accounts';
import * as banksActions from '@redux/actions/banks';
import * as accountSlide from '@redux/slices/accounts';
import * as banksSlide from '@redux/slices/banks';
import * as typeDocsActions from '@redux/actions/typeDocs';
import { View, Alert } from 'react-native';
import { RootStackParamList } from 'src/routes';
import * as functions from '@utils/functions';

import {
  Header,
  Content,
  Input,
  Copy,
  Button,
  Select,
  Radio,
  Modal,
  Loader,
} from '@components';
import { RouteProp } from '@react-navigation/native';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'AccountFormScreen'>;
  route: RouteProp<RootStackParamList, 'AccountFormScreen'>;
}

const AccountFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const banksReducer: any = useBankSelector();
  const accountReducer: any = useAccountsSelectorHooks();
  const typeDocsReducer: any = useTypeDocsSelector();
  const editSelects = route?.params.edit === true ? false : true;
  const [visible, setVisble] = useState(false);

  useEffect(() => {
    dispatch(banksSlide.cleanByKey({ key: 'getBanks' }));
    dispatch(banksSlide.cleanByKey({ key: 'getPounds' }));
    dispatch(banksSlide.cleanByKey({ key: 'getTypeAccounts' }));
    dispatch(banksActions.getBanks({}));
    dispatch(banksActions.getPounds({}));
    dispatch(banksActions.getTypeAccounts({}));
    dispatch(typeDocsActions.getTypeDocs({}));
  }, []);

  useEffect(() => {
    if (
      !banksReducer.getBanks.onloading &&
      banksReducer.getBanks.response &&
      !route?.params.edit
    ) {
      dispatch(
        accountSlide.setForm({
          bank: (banksReducer.getBanks.response || [])[0].value,
        })
      );
    }
  }, [banksReducer.getBanks]);

  useEffect(() => {
    if (
      !banksReducer.getPounds.onloading &&
      banksReducer.getPounds.response &&
      !route?.params.edit
    ) {
      dispatch(
        accountSlide.setForm({
          pound: (banksReducer.getPounds.response || [])[0].value,
        })
      );
    }
  }, [banksReducer.getPounds]);

  useEffect(() => {
    if (
      !banksReducer.getTypeAccounts.onloading &&
      banksReducer.getTypeAccounts.response &&
      !route?.params.edit
    ) {
      dispatch(
        accountSlide.setForm({
          typeAccount: (banksReducer.getTypeAccounts.response || [])[0].value,
        })
      );
    }
  }, [banksReducer.getTypeAccounts]);

  useEffect(() => {
    if (
      !typeDocsReducer.getTypeDocs.onloading &&
      typeDocsReducer.getTypeDocs.response?.data
    ) {
      dispatch(
        accountSlide.setForm({
          typeDocTitular: (typeDocsReducer.getTypeDocs.response?.data || [])[0]
            .codigo,
        })
      );
    }
  }, [typeDocsReducer.getTypeDocs]);

  const cleanTitular = {
    numDocTitular: undefined,
    nameTitular: undefined,
    dadnameTitular: undefined,
    momnameTitular: undefined,
  };

  const findDoc = (value: string) => 
    (typeDocsReducer.getTypeDocs.response?.data || []).find(
      (row: any) => row?.codigo === value
    );

  const onClickSave = () => {
    if (
      functions.isEmptyText(accountReducer.form?.bank) ||
      functions.isEmptyText(accountReducer.form?.typeAccount) ||
      functions.isEmptyText(accountReducer.form?.pound) ||
      functions.isEmptyText(accountReducer.form?.number) ||
      functions.isEmptyText(accountReducer.form?.name)
    ) {
      Alert.alert('Error', 'Ingrese todos los campos');
    } else {
      let obj: any = {
        banco: accountReducer.form?.bank,
        tipo: accountReducer.form?.typeAccount,
        moneda: accountReducer.form?.pound,
        numero: accountReducer.form?.number,
        nombre: accountReducer.form?.name,
        CuentaPropia: accountReducer.form?.mine,
      };

      if (route?.params.edit) {
        obj.id = accountReducer.form?.id;
      }

      if (!obj.CuentaPropia) {
        if (
          functions.isEmptyText(accountReducer.form?.typeDocTitular) ||
          functions.isEmptyText(accountReducer.form?.numDocTitular) ||
          functions.isEmptyText(accountReducer.form?.nameTitular) ||
          functions.isEmptyText(accountReducer.form?.dadnameTitular) ||
          functions.isEmptyText(accountReducer.form?.momnameTitular)
        ) {
          Alert.alert('Error', 'Ingrese todos los campos del titular');
          return
        }
        obj = {
          ...obj,
          propietario: {
            nombre: accountReducer.form?.nameTitular,
            apellidoPaterno: accountReducer.form?.dadnameTitular,
            apellidoMaterno: accountReducer.form?.momnameTitular,
            tipoDocumento: accountReducer.form?.typeDocTitular,
            numero: accountReducer.form?.numDocTitular
          }
        }
      }
      /* console.log(JSON.stringify(obj, null, 3)) */
      dispatch(
        accountsActions.saveAccount({
          start: () => setVisble(true),
          success: () => navigation.goBack(),
          error: () => Alert.alert('Error', 'Tenemos problemas'),
          finally: () => {
            setVisble(false);
            dispatch(accountsActions.getAccounts({}));
          },
          data: obj,
        })
      );
    }
  };

  const onClickCancel = () => {
    dispatch(accountSlide.cleanForm())
    navigation.goBack()
  }

  const renderFormTitular = () => {
    if (accountReducer.form?.company || accountReducer.form?.owner) {
      return (
        <Fragment>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Select.Content>
                <Select
                  selectedValue={accountReducer.form?.typeDocTitular}
                  onValueChange={(itemValue: any) =>
                    dispatch(
                      accountSlide.setForm({ typeDocTitular: itemValue })
                    )
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
                value={accountReducer.form?.numDocTitular}
                onChangeText={(text) =>
                  dispatch(accountSlide.setForm({ numDocTitular: text }))
                }
                placeholder="Documento"
                maxLength={findDoc(accountReducer.form?.typeDocTitular)?.longitud}
              />
            </View>
          </View>
          <Input
            editable={true}
            value={accountReducer.form?.nameTitular}
            onChangeText={(text) =>
              dispatch(accountSlide.setForm({ nameTitular: text }))
            }
            placeholder="Nombre del titular"
          />
          <Input
            editable={true}
            value={accountReducer.form?.dadnameTitular}
            onChangeText={(text) =>
              dispatch(accountSlide.setForm({ dadnameTitular: text }))
            }
            placeholder="Apellido paterno del titular"
          />
          <Input
            editable={true}
            value={accountReducer.form?.momnameTitular}
            onChangeText={(text) =>
              dispatch(accountSlide.setForm({ momnameTitular: text }))
            }
            placeholder="Apellido materno del titular"
          />
        </Fragment>
      );
    }

    return null;
  };

  const renderViewFormTitular = () => {
    if (route?.params.edit && accountReducer.form?.company) {
      return (
        <Fragment>
          <Input
            editable={false}
            value={accountReducer.form?.nameTitular}
            onChangeText={(text) =>
              dispatch(accountSlide.setForm({ nameTitular: text }))
            }
            placeholder="Nombre del titular"
          />
          <Input
            editable={false}
            value={accountReducer.form?.dadnameTitular}
            onChangeText={(text) =>
              dispatch(accountSlide.setForm({ dadnameTitular: text }))
            }
            placeholder="Apellido paterno del titular"
          />
          <Input
            editable={false}
            value={accountReducer.form?.momnameTitular}
            onChangeText={(text) =>
              dispatch(accountSlide.setForm({ momnameTitular: text }))
            }
            placeholder="Apellido materno del titular"
          />
          <Input
            editable={false}
            value={accountReducer.form?.numDocTitular}
            onChangeText={(text) =>
              dispatch(accountSlide.setForm({ numDocTitular: text }))
            }
            placeholder="Documento"
          />
        </Fragment>
      );
    }

    return null;
  };

  return (
    <>
      <Header>
        <Header.ArrowBack navigation={navigation} />
        <Header.Title internal>
          {route?.params.edit ? 'Editar' : 'Agregar'} cuenta bancaria
        </Header.Title>
      </Header>
      <Content>
        <Copy>
          {!route?.params.edit
            ? 'Añade la cuenta bancaria desde donde envias tus soles o dolares'
            : 'Recuerda que solo podrás editar el nombre con el identificas a esta cuenta.'}
        </Copy>
        <View style={{ marginBottom: 35 }} />
        <Select.Content enabled={!editSelects}>
          <Select
            mode="dropdown"
            enabled={editSelects}
            selectedValue={accountReducer.form?.bank}
            onValueChange={(text: string) =>
              dispatch(accountSlide.setForm({ bank: text }))
            }
          >
            {(banksReducer.getBanks.response || []).map((row: any) => (
              <Select.Item key={row.value} label={row.name} value={row.value} />
            ))}
          </Select>
        </Select.Content>
        <Select.Content enabled={!editSelects}>
          <Select
            mode="dropdown"
            enabled={editSelects}
            selectedValue={accountReducer.form?.pound}
            onValueChange={(text: string) =>
              dispatch(accountSlide.setForm({ pound: text }))
            }
          >
            {(banksReducer.getPounds.response || []).map((row: any) => (
              <Select.Item key={row.value} label={row.name} value={row.value} />
            ))}
          </Select>
        </Select.Content>
        <Select.Content enabled={!editSelects}>
          <Select
            mode="dropdown"
            enabled={editSelects}
            selectedValue={accountReducer.form?.typeAccount}
            onValueChange={(text: string) =>
              dispatch(accountSlide.setForm({ typeAccount: text }))
            }
          >
            {(banksReducer.getTypeAccounts.response || []).map((row: any) => (
              <Select.Item key={row.value} label={row.name} value={row.value} />
            ))}
          </Select>
        </Select.Content>
        <Input
          placeholder="Número de cuenta"
          keyboardType="number-pad"
          value={accountReducer.form?.number}
          onChangeText={(text) =>
            dispatch(accountSlide.setForm({ number: text }))
          }
          editable={editSelects}
        />
        <Input
          placeholder="Nombre de cuenta"
          editable={true}
          value={accountReducer.form?.name}
          onChangeText={(text) =>
            dispatch(accountSlide.setForm({ name: text }))
          }
        />
        {renderViewFormTitular()}
        {route?.params.edit ? null : (
          <Fragment>
            <Radio
              value={accountReducer.form?.mine}
              onPress={(checked) =>
                dispatch(
                  accountSlide.setForm({
                    mine: checked,
                    company: false,
                    ...cleanTitular,
                  })
                )
              }
            >
              Declaro que esta cuenta es mía.
            </Radio>
            <View style={{ marginBottom: 12 }} />
            <Radio
              value={accountReducer.form?.company}
              onPress={(checked) =>
                dispatch(
                  accountSlide.setForm({
                    company: checked,
                    mine: false,
                    ...cleanTitular,
                  })
                )
              }
            >
              Cuenta registrada a nombre de un tercero o empresa.
            </Radio>
            <View style={{ marginBottom: 12 }} />
          </Fragment>
        )}
        {renderFormTitular()}
        <Button type="primary" onPress={onClickSave}>
          <Button.Text type="primary">GUARDAR</Button.Text>
        </Button>
        <Button type="secondary" onPress={onClickCancel}>
          <Button.Text type="secondary">CANCELAR</Button.Text>
        </Button>
      </Content>
      <Modal visible={visible}>
        <Modal.Backdrop />
        <Modal.Card centered style={{ elevation: 4 }}>
          <Loader />
        </Modal.Card>
      </Modal>
    </>
  );
};

export default AccountFormScreen;
