import { StackNavigationProp } from '@react-navigation/stack';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useCallback, useEffect, useState, Fragment } from 'react';
import { RootStackParamList } from 'src/routes';
import { View, Alert } from 'react-native';

import {
  useOperationsSelector,
  useAccountsSelectorHooks,
  useTransactionsSelector,
  useAppDispatch,
} from '@hooks';
import * as operationSlide from '@redux/slices/operations';
import * as operationsActions from '@redux/actions/operations';
import * as transactionsActions from '@redux/actions/transactions';
import * as transactionsSlice from '@redux/slices/transactions';
import * as accountSlide from '@redux/slices/accounts';
import * as accountActions from '@redux/actions/accounts';
import * as fundActions from '@redux/actions/originFund';
import {
  Header,
  Content,
  Card,
  Steps,
  Icon,
  Message,
  Button,
  Select,
  Modal,
  Loader,
  Input,
  Radio,
} from '@components';
import { FORMAT_DECIMALS_LENGTH } from '@utils/constants';
import * as functions from '@utils/functions';

import { StepTitle, InputLabel, FloatingRoundButtton, Line } from './styles';
import { useFundSelector } from '@hooks/redux/fundsSelectorHooks';
import useRefreshTransaction from './useRefreshTransaction';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ChangeScreen'>;
}

const firstStep = 1;
const secondStep = 2;
const thirdStep = 3;

const ChangeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const operationsReducer: any = useOperationsSelector();
  const accountsReducer: any = useAccountsSelectorHooks();
  const transactionsReducer: any = useTransactionsSelector();
  const fundsReducer: any = useFundSelector()
  const [copy, setCopy] = useState<{
    visible?: boolean;
    content?: string;
  }>({
    visible: false,
    content: '',
  });
  const [toggle, setToggle] = useState(true);
  const { refreshAllTransactions, refresTransactionsByState } = useRefreshTransaction()

  useEffect(() => {
    dispatch(operationSlide.cleanForm());
    dispatch(operationSlide.cleanByKey({ key: 'getCurrentChange' }));
    dispatch(accountSlide.cleanByKey({ key: 'getAccounts' }));
    dispatch(transactionsSlice.cleanByKey({ key: 'sendTransaction' }));
    dispatch(accountActions.getAccounts({}));
    dispatch(fundActions.getFunds({}));
    dispatch(operationsActions.getCurrentChange());
    dispatch(operationSlide.setForm({ typeChange: true }));

    if (firstStep === operationsReducer.currentStep) {
      dispatch(transactionsSlice.cleanByKey({ key: 'getTransaction' }));
    }
  }, []);

  const filterAccountsByPountd = (accounts: any[], codPount: string) =>
    accounts ? accounts.filter(account => account.codPound === codPount) : []
  
  const fillAccounts = () => {
    const accountSend = filterAccountsByPountd(
      accountsReducer.getAccounts.response?.list,
      operationsReducer.form?.typeChange ? "USD" : "PEN"
    )
    const accountRecived = filterAccountsByPountd(
      accountsReducer.getAccounts.response?.list,
      !operationsReducer.form?.typeChange ? "USD" : "PEN"
    )
    dispatch(
      operationSlide.setForm({
        accountSend: accountSend.length > 0 ? accountSend[0].id : null,
        accountRecived: accountRecived.length > 0 ? accountRecived[0].id : null,
      })
    );
  }

  useEffect(() => {
    if (
      !accountsReducer.getAccounts.onloading &&
      accountsReducer.getAccounts.response &&
      (accountsReducer.getAccounts.response?.list || []).length > 0
    ) {
      fillAccounts()
    }
  }, [accountsReducer.getAccounts]);

  useEffect(() => {
    if (
      !fundsReducer.getFunds.onloading &&
      fundsReducer.getFunds.response &&
      (fundsReducer.getFunds.response || []).length > 0
    ) {
      dispatch(
        operationSlide.setForm({
          foundOrigin: (fundsReducer.getFunds.response || [])[0].id,
        })
      );
    }
  }, [fundsReducer.getFunds]);

  const goToAccount = useCallback(() => {
    dispatch(accountSlide.cleanForm());
    navigation.navigate('AccountFormScreen', { edit: false });
  }, [navigation]);

  const convertChange = (value: number, typeChange: boolean) => {
    if (operationsReducer.getCurrentChange.response) {
      const { compra, venta } =
        operationsReducer.getCurrentChange.response.data;
      const temp = isNaN(value)
        ? 0
        : parseFloat(value.toFixed(FORMAT_DECIMALS_LENGTH));
      return !typeChange
        ? (temp / parseFloat(venta || 0)).toFixed(FORMAT_DECIMALS_LENGTH)
        : (parseFloat(compra || 0) * temp).toFixed(FORMAT_DECIMALS_LENGTH);
    }

    return null;
  };

  const onPressChangePound = () =>
    dispatch(
      operationSlide.setForm({
        typeChange: !operationsReducer.form?.typeChange,
      })
    );

  useEffect(() => {
    // CAmbiar tambien las cuentas seleccionadas
    dispatch(
      operationSlide.setForm({
        recived: operationsReducer.form?.send
          ? convertChange(
            parseFloat(operationsReducer.form?.send),
            operationsReducer.form?.typeChange
          )
          : null,
      })
    );
    fillAccounts()
  }, [operationsReducer.form?.typeChange]);

  const renderStep = (
    number: number,
    label: string,
    active: boolean,
    complete: boolean
  ) => (
    <Steps.Step active={active} complete={complete}>
      <Steps.Circle active={active} complete={complete}>
        {complete ? (
          <Icon name="check" color="#FE761E" size={16} />
        ) : (
          <Steps.Number active={active} complete={complete}>
            {number}
          </Steps.Number>
        )}
      </Steps.Circle>
      <Steps.Text active={active} complete={complete}>
        {label}
      </Steps.Text>
    </Steps.Step>
  );

  const renderCardConfirm = (
    value: boolean,
    onPressRadio: (checked: boolean) => void,
    header: string,
    onPressMenu: () => void,
    children: any
  ) => (
    <Card>
      <Card.Header>
        <View style={{ flex: 1 }}>
          <Radio value={value} bold={value} onPress={onPressRadio}>
            {header}
          </Radio>
        </View>
        <Card.Menu onPress={onPressMenu}>
          <Icon name={toggle ? 'down' : 'up'} size={16} color="#CCCCCC" />
        </Card.Menu>
      </Card.Header>
      {toggle && value && (
        <Fragment>
          {children && <View style={{ marginBottom: 24 }} />}
          <Card.Body>{children}</Card.Body>
        </Fragment>
      )}
    </Card>
  );

  const sendOperation = () => {
    const payload = {
      montoOrigen: parseFloat(operationsReducer.form?.send || 0),
      cuentaOrigen: operationsReducer.form?.accountSend,
      cuentaDestino: operationsReducer.form?.accountRecived,
      idOrigenFondo: operationsReducer.form?.foundOrigin,
      cupon: operationsReducer.form?.cupon || '',
    };

    console.log("🚀 ~ file: index.tsx ~ line 211 ~ sendOperation ~ form", JSON.stringify(operationsReducer.form, null, 3))
    console.log("🚀 ~ file: index.tsx ~ line 215 ~ sendOperation ~ payload", JSON.stringify(payload, null, 3))

    if (
      functions.isEmptyText(payload.montoOrigen.toString()) ||
      payload.montoOrigen === 0 ||
      functions.isEmptyText(payload.cuentaOrigen) ||
      functions.isEmptyText(payload.cuentaDestino)
    ) {
      Alert.alert(
        'Error',
        'Ingrese el dinero a enviar y seleccione sus cuentas'
      );
    } else if (payload.cuentaDestino === payload.cuentaOrigen) {
      Alert.alert('Error', 'Las cuentas tienen que ser diferentes');
    } else {
      dispatch(
        transactionsActions.sendTransaction({
          start: () =>
            setCopy({
              visible: true,
              content: '',
            }),
          success: () => refresTransactionsByState(1),
          error: () =>
            setCopy({
              visible: false,
              content: '',
            }),
          finally: () => console.log('finally'),
          data: payload,
        })
      );
    }
  };

  const confirmOperation = () => {
    const payload = {
      id: transactionsReducer.getTransaction.response?.data?.id,
      tipo: operationsReducer.form?.typeConfirmT
        ? 'T'
        : operationsReducer.form?.typeConfirmE
          ? 'E'
          : operationsReducer.form?.typeConfirmB
            ? 'B'
            : '',
      numeroOperacion: operationsReducer.form?.typeConfirmT
        ? operationsReducer.form?.numberCode
        : null,
    };

    if (functions.isEmptyText(payload.tipo)) {
      Alert.alert('Error', 'Seleccione una forma de confirmación');
    } else if (
      operationsReducer.form?.typeConfirmT &&
      functions.isEmptyText(payload.numeroOperacion)
    ) {
      Alert.alert('Error', 'Ingrese el numero de la operación');
    } else {
      dispatch(
        transactionsActions.confirmTransaction({
          start: () =>
            setCopy({
              visible: true,
              content: '',
            }),
          success: () =>
            setCopy({
              visible: true,
              content: '',
            }),
          error: () =>
            setCopy({
              visible: true,
              content: '',
            }),
          finally: () => 
            dispatch(
              operationSlide.setForm(
                { numberCode: null }
              )
            ),
          data: payload,
        })
      );
    }
  };

  useEffect(() => {
    if (firstStep === operationsReducer.currentStep) {
      if (
        !transactionsReducer.sendTransaction.response &&
        transactionsReducer.sendTransaction.error
      ) {
        Alert.alert(
          'Error',
          (transactionsReducer.sendTransaction.error?.Data || [])
            .map((row: any) => row.Mensaje)
            .join('\n')
        );
      }

      if (transactionsReducer.sendTransaction.response) {
        dispatch(
          transactionsActions.getTransaction({
            id: transactionsReducer.sendTransaction.response?.data?.id,
          })
        );
        dispatch(operationSlide.setStep({ step: secondStep }));
      }
    }
  }, [transactionsReducer.sendTransaction]);

  useEffect(() => {
    if (secondStep === operationsReducer.currentStep) {
      setCopy({
        visible: true,
        content:
          'Si no procede con la transferencia en 25 minutos, está operación se cancelara.',
      });
    }
  }, [operationsReducer.currentStep]);

  useEffect(() => {
    if (thirdStep === operationsReducer.currentStep) {
      if (
        !transactionsReducer.confirmTransaction.response &&
        transactionsReducer.confirmTransaction.error
      ) {
        setCopy({
          visible: true,
          content: (transactionsReducer.confirmTransaction.error?.Data || [])
          .map((row: any) => row.Mensaje)
          .join('\n'),
        });
      }

      if (transactionsReducer.confirmTransaction.response) {
        setCopy({
          visible: true,
          content:
            '¡Gracias por realizar la transferencia!\nEl pedido será validado después de confirmar y revisar la transferencia.',
        });
        // dispatch(
        //   transactionsActions.getTransaction({
        //     id: transactionsReducer.sendTransaction.response?.data?.id,
        //   })
        // );
      }
    }
  }, [transactionsReducer.confirmTransaction]);

  const copiedText = (text: any) => Clipboard.setString(text.toString());

  const onPressConfirmType = (
    typeConfirmT: boolean,
    typeConfirmE: boolean,
    typeConfirmB: boolean
  ) => {
    if (typeConfirmT || typeConfirmE || typeConfirmB) {
      setToggle(true);
    } else {
      setToggle(!toggle);
    }

    dispatch(
      operationSlide.setForm({
        typeConfirmT,
        typeConfirmE,
        typeConfirmB,
      })
    );
  };

  const renderStepPane = () => {
    switch (operationsReducer.currentStep) {
      case firstStep:
        const hasAccounts =
          filterAccountsByPountd(accountsReducer.getAccounts.response?.list, "USD")
            .length > 0 ||
          filterAccountsByPountd(accountsReducer.getAccounts.response?.list, "PEN")
            .length > 0;
        const renderInputCupon = (
          <InputLabel>
            <InputLabel.Input
              placeholder="Coloca tu cupón aquí "
              editable={true}
              value={operationsReducer.form?.cupon}
              onChangeText={(text: string) =>
                dispatch(operationSlide.setForm({ cupon: text }))
              }
            />
            <InputLabel.Label>
              <InputLabel.LabelText>
                <Icon name="tago" color="#FFFFFF" size={16} /> Cupón
              </InputLabel.LabelText>
            </InputLabel.Label>
          </InputLabel>
        );

        return (
          <Fragment>
            <StepTitle>Tipo de Cambio:</StepTitle>
            <StepTitle light>
              <StepTitle dark>Compra:</StepTitle>{' '}
              {operationsReducer.getCurrentChange.response?.data?.compra} |{' '}
              <StepTitle dark>Venta:</StepTitle>{' '}
              {operationsReducer.getCurrentChange.response?.data?.venta}
            </StepTitle>
            <View style={{ marginBottom: 32 }} />
            <View>
              <InputLabel>
                <InputLabel.Input
                  placeholder="Envias"
                  keyboardType="number-pad"
                  editable={true}
                  value={operationsReducer.form?.send}
                  onChangeText={(text: string) =>
                    dispatch(
                      operationSlide.setForm({
                        send: parseFloat(text),
                        recived: convertChange(
                          parseFloat(text),
                          operationsReducer.form?.typeChange
                        ),
                      })
                    )
                  }
                />
                <InputLabel.Label>
                  <InputLabel.LabelText>
                    {operationsReducer.form?.typeChange ? 'Dólares' : 'Soles'}
                  </InputLabel.LabelText>
                </InputLabel.Label>
              </InputLabel>
              <FloatingRoundButtton>
                <FloatingRoundButtton.Opacity />
                <FloatingRoundButtton.Content onPress={onPressChangePound}>
                  <Icon name="sync" color="#848484" size={21} />
                </FloatingRoundButtton.Content>
              </FloatingRoundButtton>
              <InputLabel>
                <InputLabel.Input
                  placeholder="Recibes"
                  keyboardType="number-pad"
                  editable={true}
                  value={operationsReducer.form?.recived}
                  onChangeText={(text: string) =>
                    dispatch(
                      operationSlide.setForm({
                        recived: parseFloat(text),
                        send: convertChange(
                          parseFloat(text),
                          !operationsReducer.form?.typeChange
                        ),
                      })
                    )
                  }
                />
                <InputLabel.Label>
                  <InputLabel.LabelText>
                    {!operationsReducer.form?.typeChange ? 'Dólares' : 'Soles'}
                  </InputLabel.LabelText>
                </InputLabel.Label>
              </InputLabel>
              <Select.Label>Origen de fondos</Select.Label>
              <Select.Content>
                <Select
                  selectedValue={operationsReducer.form?.foundOrigin}
                  onValueChange={(itemValue: any) =>
                    dispatch(
                      operationSlide.setForm({ foundOrigin: itemValue })
                    )
                  }
                >
                  {(fundsReducer.getFunds?.response || []).map(
                    (row: any) => (
                      <Select.Item
                        key={row.id}
                        label={row.texto}
                        value={row.id}
                      />
                    )
                  )}
                </Select>
              </Select.Content>
            </View>
            {!hasAccounts ? renderInputCupon : null}
            <View style={{ marginBottom: hasAccounts ? 0 : 20 }} />
            {hasAccounts ? (
              <Fragment>
                <Select.Label>¿Desde que cuenta envías tu dinero?</Select.Label>
                <Select.Content>
                  <Select
                    selectedValue={operationsReducer.form?.accountSend}
                    onValueChange={(itemValue: any) =>
                      dispatch(
                        operationSlide.setForm({ accountSend: itemValue })
                      )
                    }
                  >
                    {
                      filterAccountsByPountd(
                        accountsReducer.getAccounts.response?.list,
                        operationsReducer.form?.typeChange ? "USD" : "PEN"
                      ).map((row: any) => (
                        <Select.Item key={row.id} label={row.name} value={row.id} />
                      ))}
                  </Select>
                </Select.Content>
                <Select.Label>
                  En que cuenta deseas recibir tu dinero?
                </Select.Label>
                <Select.Content>
                  <Select
                    selectedValue={operationsReducer.form?.accountRecived}
                    onValueChange={(itemValue: any) =>
                      dispatch(
                        operationSlide.setForm({ accountRecived: itemValue })
                      )
                    }
                  >
                    {
                      filterAccountsByPountd(
                        accountsReducer.getAccounts.response?.list,
                        !operationsReducer.form?.typeChange ? "USD" : "PEN"
                      ).map((row: any) => (
                        <Select.Item key={row.id} label={row.name} value={row.id} />
                      ))}
                  </Select>
                </Select.Content>
              </Fragment>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <Button
                  type="outline"
                  style={{ flex: 1 }}
                  onPress={goToAccount}
                >
                  <Button.Text type="outline">
                    Agregar cuenta{'\n'}bancaria soles
                  </Button.Text>
                </Button>
                <View style={{ marginRight: 16 }} />
                <Button
                  type="outline"
                  style={{ flex: 1 }}
                  onPress={goToAccount}
                >
                  <Button.Text type="outline">
                    Agregar cuenta{'\n'}bancaria dolares
                  </Button.Text>
                </Button>
              </View>
            )}
            {hasAccounts ? renderInputCupon : null}
            <View style={{ marginBottom: 12 }} />
            <Message>
              <Message.Icon>
                <Icon name="exclamationcircleo" size={12} color="#FAAD14" />
              </Message.Icon>
              <Message.Text>
                Recuerda realizar la transferencia en el plazo establecido.
                Culminado ese tiempo la operación se cancelara automáticamente.
              </Message.Text>
            </Message>
            <Button type="primary" onPress={sendOperation}>
              <Button.Text type="primary">REALIZAR OPERACIÓN</Button.Text>
            </Button>
            <Button
              type="secondary"
              onPress={() => {
                dispatch(
                  operationSlide.setForm({
                    send: null,
                    recived: null,
                    cupon: null,
                  })
                )
                dispatch(operationSlide.setStep({ step: firstStep }));
                /* console.log(JSON.stringify(operationsReducer.form, null, 3)) */
              }
              }
            >
              <Button.Text type="secondary">CANCELAR</Button.Text>
            </Button>
          </Fragment>
        );
      case secondStep:
        if (
          transactionsReducer.getTransaction.onloading ||
          transactionsReducer.sendTransaction.onloading
        ) {
          return <Loader />;
        }

        return (
          <Fragment>
            <StepTitle fontSize={20} lineHeight={27}>
              Para poder seguir con la operación, realiza una transferencia
              bancaria:
            </StepTitle>
            <View style={{ marginBottom: 24 }} />
            <StepTitle dark fontSize={18} lineHeight={25}>
              Antés de continuar recuerda:
            </StepTitle>
            <StepTitle light>
              Verifica que el destino sea{' '}
              <StepTitle dark>Inkambio SAC</StepTitle> con RUC{' '}
              <StepTitle dark>
                {transactionsReducer.getTransaction.response?.data.rucInkambio}
              </StepTitle>
              .
            </StepTitle>
            <View style={{ marginBottom: 32 }} />
            <StepTitle dark fontSize={24} lineHeight={33} textAlign="center">
              Transfiere
            </StepTitle>
            <View style={{ marginBottom: 16 }} />
            <StepTitle primary fontSize={24} lineHeight={33} textAlign="center">
              {transactionsReducer.getTransaction.response?.data.monedaOrigen}{' '}
              {parseFloat(
                transactionsReducer.getTransaction.response?.data.montoOrigen
              ).toFixed(FORMAT_DECIMALS_LENGTH)}{' '}
              <StepTitle
                fontSize={24}
                lineHeight={33}
                onPress={() =>
                  copiedText(
                    transactionsReducer.getTransaction.response?.data
                      .montoOrigen
                  )
                }
              >
                <Icon name="copy1" color="#848484" size={24} />
              </StepTitle>
            </StepTitle>
            <View style={{ marginBottom: 32 }} />
            <Card>
              <Card.Body>
                <StepTitle light textAlign="center">
                  Desde tu cuenta{' '}
                  {
                    transactionsReducer.getTransaction.response?.data
                      .cuentaOrigen
                  }
                </StepTitle>
                <View style={{ marginBottom: 4 }} />
                <StepTitle dark textAlign="center">
                  N°{' '}
                  {
                    transactionsReducer.getTransaction.response?.data
                      .numeroCuentaOrigen
                  }
                </StepTitle>
                <Line />
                <StepTitle light textAlign="center">
                  ∆ Hacia la cuenta{' '}
                  {
                    transactionsReducer.getTransaction.response?.data
                      .cuentaInkambio
                  }
                </StepTitle>
                <View style={{ marginBottom: 4 }} />
                <StepTitle dark textAlign="center" centered>
                  N°{' '}
                  {
                    transactionsReducer.getTransaction.response?.data
                      .numeroCuentaInkambio
                  }{' '}
                  <StepTitle
                    fontSize={24}
                    lineHeight={33}
                    onPress={() =>
                      copiedText(
                        transactionsReducer.getTransaction.response?.data
                          .numeroCuentaInkambio
                      )
                    }
                  >
                    <Icon name="copy1" color="#848484" size={24} />
                  </StepTitle>
                </StepTitle>
                <View style={{ marginBottom: 12 }} />
                <StepTitle textAlign="center">
                  Inkambio SAC{'\n'}RUC{' '}
                  {
                    transactionsReducer.getTransaction.response?.data
                      .rucInkambio
                  }
                  .
                </StepTitle>
              </Card.Body>
            </Card>
            <StepTitle light>
              Al momento de realizar la transferencia puedes enviarnos la
              constancia al correo desde tu banca por internet BBVA.
            </StepTitle>
            <View style={{ marginBottom: 16 }} />
            <StepTitle bold>
              pagos@inkambio.com
              <StepTitle onPress={() => copiedText('pagos@inkambio.com')}>
                <Icon name="copy1" color="#848484" size={16} />
              </StepTitle>
            </StepTitle>
            <View style={{ marginBottom: 16 }} />
            <StepTitle light>
              El número de operación con Inkambio es:{' '}
              <StepTitle dark>
                {transactionsReducer.getTransaction.response?.data.numero}
              </StepTitle>
            </StepTitle>
            <View style={{ marginBottom: 36 }} />
            <Button
              type="primary"
              onPress={() =>
                dispatch(operationSlide.setStep({ step: thirdStep }))
              }
            >
              <Button.Text type="primary">CONTINUAR</Button.Text>
            </Button>
            <Button
              type="secondary"
              onPress={() => {
                dispatch(
                  operationSlide.setForm({
                    send: null,
                    recived: null,
                    cupon: null,
                  })
                )
                dispatch(
                  transactionsSlice.cleanByKey({ key: 'getTransaction' })
                );
                dispatch(operationSlide.setStep({ step: firstStep }));
              }}
            >
              <Button.Text type="secondary">CANCELAR</Button.Text>
            </Button>
          </Fragment>
        );
      case thirdStep:
        return (
          <Fragment>
            <StepTitle fontSize={20} lineHeight={27}>
              Elige cómo deseas confirmar tu transferencia:
            </StepTitle>
            <View style={{ marginBottom: 36 }} />
            {renderCardConfirm(
              operationsReducer.form?.typeConfirmT,
              (cheked: boolean) =>
                dispatch(
                  operationSlide.setForm({
                    typeConfirmT: cheked,
                    typeConfirmE: false,
                    typeConfirmB: false,
                  })
                ),
              'Número de operación bancaria',
              () =>
                onPressConfirmType(
                  operationsReducer.form?.typeConfirmT,
                  false,
                  false
                ),
              <Fragment>
                <StepTitle light>
                  Envia el número de la operación proporcionada por tu banco.
                </StepTitle>
                <View style={{ marginBottom: 8 }} />
                <Input
                  editable={true}
                  value={operationsReducer.form?.numberCode}
                  onChangeText={(text: string) =>
                    dispatch(operationSlide.setForm({ numberCode: text }))
                  }
                  placeholder="Código de transferencia"
                />
                <StepTitle>¿No encuentras tu número de operación?</StepTitle>
              </Fragment>
            )}
            {renderCardConfirm(
              operationsReducer.form?.typeConfirmE,
              (cheked: boolean) =>
                dispatch(
                  operationSlide.setForm({
                    typeConfirmE: cheked,
                    typeConfirmT: false,
                    typeConfirmB: false,
                    numberCode: null,
                  })
                ),
              'Enviar constancia por correo',
              () =>
                onPressConfirmType(
                  false,
                  operationsReducer.form?.typeConfirmE,
                  false
                ),
              <Fragment>
                <StepTitle light>
                  Enviar la constancia de tu transferencia a:
                </StepTitle>
                <View style={{ marginBottom: 24 }} />
                <StepTitle bold>
                  pagos@inkambio.com
                  <StepTitle onPress={() => copiedText('pagos@inkambio.com')}>
                    <Icon name="copy1" color="#848484" size={16} />
                  </StepTitle>
                </StepTitle>
              </Fragment>
            )}
            {renderCardConfirm(
              operationsReducer.form?.typeConfirmB,
              (cheked: boolean) =>
                dispatch(
                  operationSlide.setForm({
                    typeConfirmE: false,
                    typeConfirmT: false,
                    typeConfirmB: cheked,
                    numberCode: null,
                  })
                ),
              'Ya envié la constancia desde mi banca por nternet',
              () =>
                onPressConfirmType(
                  false,
                  false,
                  operationsReducer.form?.typeConfirmB
                ),
              null
            )}
            <Button type="primary" onPress={confirmOperation}>
              <Button.Text type="primary">CONTINUAR</Button.Text>
            </Button>
            <Button
              type="secondary"
              onPress={() => {
                dispatch(
                  operationSlide.setForm({
                    send: null,
                    recived: null,
                    cupon: null,
                  })
                )
                dispatch(
                  transactionsSlice.cleanByKey({ key: 'getTransaction' })
                );
                dispatch(operationSlide.setStep({ step: firstStep }));
              }}
            >
              <Button.Text type="secondary">CANCELAR</Button.Text>
            </Button>
          </Fragment>
        );
    }
  };

  const validateVisibleModal =
    transactionsReducer.sendTransaction.onloading || copy.content?.length === 0;

  return (
    <>
      <Header>
        <Header.Title>Nueva Operación</Header.Title>
      </Header>
      <Content>
        <Steps>
          {renderStep(
            1,
            'Registra tu\nOperación',
            firstStep === operationsReducer.currentStep,
            firstStep < operationsReducer.currentStep
          )}
          <Steps.Line />
          {renderStep(
            2,
            'Transfiere a\nInkambio',
            secondStep === operationsReducer.currentStep,
            secondStep < operationsReducer.currentStep
          )}
          <Steps.Line />
          {renderStep(
            3,
            'Confirma tu\ntransferencia',
            thirdStep === operationsReducer.currentStep,
            false
          )}
        </Steps>
        {renderStepPane()}
        <Modal visible={copy.visible}>
          <Modal.Backdrop />
          <Modal.Card centered={validateVisibleModal} style={{ elevation: 4 }}>
            {validateVisibleModal ? (
              <Loader />
            ) : (
              <Modal.Content>
                <Modal.Copies>
                  <Modal.Description>{copy.content}</Modal.Description>
                </Modal.Copies>
                <Modal.Actions>
                  <Modal.Button
                    type="primary"
                    onPress={() => {
                      setCopy({ content: '', visible: false });
                      if (thirdStep === operationsReducer.currentStep) {
                        dispatch(operationSlide.setStep({ step: firstStep }));
                        refreshAllTransactions()
                        if (transactionsReducer.sendTransaction.response){
                          navigation.navigate('OperationDetailScreen', {
                            id: transactionsReducer.sendTransaction.response?.data
                              ?.id,
                          });
                        } else {
                          navigation.navigate('HistoryScreen')
                        }
                      }
                    }}
                  >
                    <Modal.Button.Text type="primary">Ok</Modal.Button.Text>
                  </Modal.Button>
                </Modal.Actions>
              </Modal.Content>
            )}
          </Modal.Card>
        </Modal>
      </Content>
    </>
  );
};

export default ChangeScreen;
