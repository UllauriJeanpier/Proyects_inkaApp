import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { View, Alert } from 'react-native';
import { RootStackParamList } from 'src/routes';
import { useAccountsSelectorHooks, useAppDispatch } from '@hooks';
import * as accountSlide from '@redux/slices/accounts';
import * as accountActions from '@redux/actions/accounts';
import emptyAccount from '@assets/image/empty-accounts.png';
import { SvgUri } from 'react-native-svg';

import {
  Header,
  Content,
  Button,
  Copy,
  Image,
  Collapse,
  Icon,
  Modal,
  Loader,
} from '@components';
import AccountItem from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'AccountsScreen'>;
}

const AccountsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const accountsReducer: any = useAccountsSelectorHooks();
  const [visible, setVisble] = useState(false);
  const [copy, setCopy] = useState<{
    title?: string;
    content?: string;
    info?: boolean;
    data?: any;
  }>({
    title: '',
    content: '',
    info: false,
    data: null,
  });

  useEffect(() => {
    dispatch(accountSlide.cleanByKey({ key: 'getAccounts' }));
    dispatch(accountActions.getAccounts({}));
  }, []);

  const onPressAdd = useCallback(() => {
    dispatch(accountSlide.cleanForm());
    navigation.navigate('AccountFormScreen', { edit: false });
  }, [navigation]);

  const onPressEdit = (row1: any) => {
    let owner: any =  { owner : false }
    if (row1.owner){
      owner = {
        owner : true,
        nameTitular: row1.owner.nombre,
        dadnameTitular: row1.owner.apellidoPaterno,
        momnameTitular: row1.owner.apellidoMaterno,
        typeDocTitular: row1.owner.tipoDocumento,
        numDocTitular: row1.owner.numero,
      } 
    }
    dispatch(
      accountSlide.setForm({
        id: row1.id,
        bank: row1.idBank,
        typeAccount: row1.idType,
        pound: row1.dad.pound.id,
        number: row1.number,
        name: row1.name,
        ...owner
      })
    );
    navigation.navigate('AccountFormScreen', { edit: true });
  };

  const onPressDelete = (row1: any) => {
    if (row1.delete) {
      setCopy({
        title: '¿Estás segura de eliminar esta cuenta?',
        content:
          'Si borra esta cuenta, perderá el historial de transacciones de esta cuenta.',
        info: false,
        data: row1.id,
      });
    } else {
      setCopy({
        title: 'No puedes eliminar esta cuenta',
        content: 'Esta cuenta tiene operaciones registradas, razón por la cúal no puede ser eliminada',
        info: true,
        data: null,
      });
    }
    setVisble(true);
  };

  const onDispatchDelete = () =>
    dispatch(
      accountActions.deleteAccount({
        start: () => setVisble(true),
        success: () => setVisble(false),
        error: () => Alert.alert('Error', 'Tenemos problemas'),
        finally: () => {
          setVisble(false);
          dispatch(accountActions.getAccounts({}))
        },
        data: copy.data,
      })
    );

  if (
    accountsReducer.getAccounts.response &&
    accountsReducer.getAccounts.response?.group?.length === 0
  ) {
    return (
      <>
        <Header>
          <Header.Title>Cuentas Bancarias</Header.Title>
        </Header>
        <Content centered>
          <Image source={emptyAccount} width={114} height={83} />
          <Copy>Agregue sus tarjetas bancarias y comencemos</Copy>
          <View style={{ marginBottom: 72 }} />
          <Button type="primary" onPress={onPressAdd}>
            <Button.Text type="primary">AGREGAR CUENTA BANCARIA</Button.Text>
          </Button>
        </Content>
      </>
    );
  }

  return (
    <>
      <Header>
        <Header.Title>Cuentas Bancarias</Header.Title>
      </Header>
      <Content>
        {accountsReducer.getAccounts.response &&
          accountsReducer.getAccounts.response?.group?.map(
            (row: any, index: number) => (
              <Fragment key={index}>
                <Collapse header={row.pound.label}>
                  {(row.list || []).map((row1: any, index1: number) => (
                    <AccountItem key={`${index}-${index1}`}>
                      <AccountItem.Img>
                        <SvgUri
                          height={35}
                          width={35}
                          uri={row1.img}
                        />
                      </AccountItem.Img>
                      <AccountItem.Content>
                        <AccountItem.Title>{row1.name}</AccountItem.Title>
                        <AccountItem.Label>Número de cuenta:</AccountItem.Label>
                        <AccountItem.Value>{row1.number}</AccountItem.Value>
                        <AccountItem.Label>Tipo de Moneda:</AccountItem.Label>
                        <AccountItem.Value>{row.pound.label}</AccountItem.Value>
                      </AccountItem.Content>
                      <AccountItem.Actions>
                        <AccountItem.Action
                          type="link"
                          onPress={() => onPressEdit({ ...row1, dad: row })}
                        >
                          <Icon name="edit" size={16} color="#CCCCCC" />
                        </AccountItem.Action>
                        <AccountItem.Action
                          type="link"
                          onPress={() => onPressDelete({ ...row1, dad: row })}
                        >
                          <Icon name="delete" size={16} color="#CCCCCC" />
                        </AccountItem.Action>
                      </AccountItem.Actions>
                    </AccountItem>
                  ))}
                </Collapse>
              </Fragment>
            )
          )}
        <Button type="primary" onPress={onPressAdd}>
          <Button.Text type="primary">AGREGAR CUENTA BANCARIA</Button.Text>
        </Button>
      </Content>
      <Modal visible={visible}>
        <Modal.Backdrop />
        <Modal.Card centered style={{ elevation: 4 }}>
          {accountsReducer.deleteAccount.onloading ? (
            <Loader />
          ) : (
            <Modal.Content>
              <Modal.Copies>
                <Modal.Title>{copy.title}</Modal.Title>
                <Modal.Description>{copy.content}</Modal.Description>
              </Modal.Copies>
              <Modal.Actions>
                {!copy.info ? (
                  <Fragment>
                    <Modal.Button
                      type="default"
                      onPress={() => setVisble(false)}
                    >
                      <Modal.Button.Text type="default">No</Modal.Button.Text>
                    </Modal.Button>
                    <Modal.Button type="primary" onPress={onDispatchDelete}>
                      <Modal.Button.Text type="primary">Sí</Modal.Button.Text>
                    </Modal.Button>
                  </Fragment>
                ) : (
                  <Modal.Button type="primary" onPress={() => setVisble(false)}>
                    <Modal.Button.Text type="primary">Ok</Modal.Button.Text>
                  </Modal.Button>
                )}
              </Modal.Actions>
            </Modal.Content>
          )}
        </Modal.Card>
      </Modal>
    </>
  );
};

export default AccountsScreen;
