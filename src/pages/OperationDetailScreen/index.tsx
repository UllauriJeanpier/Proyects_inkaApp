import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, Fragment } from 'react';
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { RootStackParamList } from 'src/routes';
import * as transactionsActions from '@redux/actions/transactions';
import * as transactionsSlide from '@redux/slices/transactions';
import * as operationSlide from '@redux/slices/operations';
import * as operationsActions from '@redux/actions/operations';
import { useTransactionsSelector, useAppDispatch } from '@hooks';
import { Header, Content, Icon, Loader, Card, Button } from '@components';
import { FORMAT_DECIMALS_LENGTH } from '@utils/constants';
import { getRouteFile, isEmptyText } from '@utils/functions';
import {
  CopyWarning,
  Timeline,
  HeaderCard,
  RowTitle,
  RowValue,
} from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'OperationDetailScreen'>;
}

const OperationDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const transactionsReducer: any = useTransactionsSelector();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(transactionsSlide.cleanByKey({ key: 'getTransaction' }));
    dispatch(transactionsActions.getTransaction({ id: route?.params?.id }));
  }, []);

  const renderDot = (
    dot: number | string,
    state: 1 | 2 | 3,
    active: boolean = false,
    complete: boolean = false,
    waiting: boolean = false
  ) => {
    switch (state) {
      case 1:
        return (
          <Timeline.State.Circle
            active={active}
            complete={complete}
            waiting={waiting}
          >
            <Timeline.State.Number
              complete={complete}
              waiting={waiting}
              active={active}
            >
              {dot}
            </Timeline.State.Number>
          </Timeline.State.Circle>
        );
      case 2:
        return (
          <Timeline.State.Circle>
            <Timeline.State.Number>{dot}</Timeline.State.Number>
          </Timeline.State.Circle>
        );
      default:
        return (
          <Timeline.State.Circle complete>
            <Icon name="check" color="#FE761E" size={16} />
          </Timeline.State.Circle>
        );
    }
  };

  useEffect(() => {
    if (transactionsReducer.getTransaction.response) {
      console.log(getRouteFile(transactionsReducer.getTransaction.response.data.bancoOrigen))
    }
    console.log("🚀 ~ file: index.tsx ~ line 80 ~ useEffect ~ getTransaction", JSON.stringify(transactionsReducer.getTransaction, null, 3))
  }, [transactionsReducer.getTransaction.response])

  if (
    transactionsReducer.getTransaction.onloading ||
    !transactionsReducer.getTransaction.response
  ) {
    return (
      <>
        <Header>
          <Header.ArrowBack
            navigation={navigation}
            onPress={() => {
              dispatch(operationSlide.setStep({ step: 1 }));
              dispatch(transactionsSlide.cleanByKey({ key: 'getTransaction' }));
              dispatch(
                transactionsSlide.cleanByKey({ key: 'sendTransaction' })
              );
              navigation.goBack();
            }}
          />
          <Header.Title internal>Operación en curso</Header.Title>
        </Header>
        <Content centered>
          <Loader />
        </Content>
      </>
    );
  }

  return (
    <>
      <Header>
        <Header.ArrowBack navigation={navigation} />
        <Header.Title internal>Operación en curso</Header.Title>
      </Header>
      <Content>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <View style={{ margin: 0, marginRight: 12 }}>
            <Icon name="warning" color="#cf0117" size={18} />
          </View>
          <CopyWarning>No olvides revisar tu correo</CopyWarning>
        </View>
        <View style={{ marginBottom: 42 }} />
        <Timeline>
          <Timeline.Item>
            <Timeline.State>
              {renderDot(1, 3)}
              <Timeline.State.Line />
            </Timeline.State>
            <Timeline.Content>
              <Timeline.Title active>Registro de operación</Timeline.Title>
              <Timeline.Description active>
                Tu operación con el código N°{' '}
                {transactionsReducer.getTransaction.response?.data.numero}, fue
                registrada con éxito.
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.State>
              {renderDot(
                2,
                transactionsReducer.getTransaction.response?.data
                  .verificadoOrigen
                  ? 3
                  : 1,
                transactionsReducer.getTransaction.response?.data
                  .verificadoOrigen,
                transactionsReducer.getTransaction.response?.data
                  .verificadoOrigen
              )}
              <Timeline.State.Line />
            </Timeline.State>
            <Timeline.Content>
              <Timeline.Title>Verificando Transferencias</Timeline.Title>
              <Timeline.Description>
                Este es el resumen de tu operación.
              </Timeline.Description>
              <Card>
                <Card.Header>
                  <HeaderCard style={{ flex: 1 }}>
                    Resumen de la operación
                  </HeaderCard>
                  <Card.Menu onPress={() => setToggle(!toggle)}>
                    <Icon
                      name={toggle ? 'down' : 'up'}
                      size={16}
                      color="#CCCCCC"
                    />
                  </Card.Menu>
                </Card.Header>
                {toggle && (
                  <Fragment>
                    <Card.Body>
                      <RowTitle>Número de Operación</RowTitle>
                      <RowValue>
                        N°{' '}
                        {
                          transactionsReducer.getTransaction.response?.data
                            .numero
                        }
                      </RowValue>
                      <RowTitle>
                        Monto que recibiras en tu cuenta
                      </RowTitle>
                      <RowValue>
                        {
                          transactionsReducer.getTransaction.response?.data
                            .monedaDestino
                        }{' '}
                        {parseFloat(
                          transactionsReducer.getTransaction.response?.data
                            .montoDestino
                        ).toFixed(FORMAT_DECIMALS_LENGTH)}
                      </RowValue>
                      <RowTitle>Monto transferiado a la cuenta de Inkambio</RowTitle>
                      <RowValue>
                        {
                          transactionsReducer.getTransaction.response?.data
                            .monedaOrigen
                        }{' '}
                        {parseFloat(
                          transactionsReducer.getTransaction.response?.data
                            .montoOrigen
                        ).toFixed(FORMAT_DECIMALS_LENGTH)}
                      </RowValue>
                      <RowTitle>Tipo de cambio</RowTitle>
                      <RowValue>
                        S/.{' '}
                        {
                          transactionsReducer.getTransaction.response?.data
                            .tipoCambio
                        }
                      </RowValue>
                      <RowTitle>Cuenta de Origen</RowTitle>
                      <RowValue>
                        <SvgUri
                          height={35}
                          width={35}
                          uri={getRouteFile(
                            transactionsReducer.getTransaction.response?.data
                              .bancoOrigen
                          )}
                        />
                        {
                          transactionsReducer.getTransaction.response?.data
                            .cuentaOrigen
                        }{' '}
                        -{' '}
                        {
                          transactionsReducer.getTransaction.response?.data
                            .numeroCuentaOrigen
                        }
                      </RowValue>
                      <RowTitle>Cuenta de Destino</RowTitle>
                      <RowValue>
                        <SvgUri
                          height={35}
                          width={35}
                          uri={getRouteFile(
                            transactionsReducer.getTransaction.response?.data
                              .bancoDestino
                          )}
                        />
                        {
                          transactionsReducer.getTransaction.response?.data
                            .cuentaDestino
                        }{' '}
                        -{' '}
                        {
                          transactionsReducer.getTransaction.response?.data
                            .numeroCuentaDestino
                        }
                      </RowValue>
                      <RowTitle>Cuenta Inkambio</RowTitle>
                      <RowValue>
                        {!isEmptyText(transactionsReducer.getTransaction.response?.data
                          .bancoInkambio) && (
                            <SvgUri
                              height={35}
                              width={35}
                              uri={getRouteFile(
                                transactionsReducer.getTransaction.response?.data
                                  .bancoInkambio
                              )}
                            />
                          )}
                        {
                          transactionsReducer.getTransaction.response?.data
                            .cuentaInkambio
                        }{' '}
                        -{' '}
                        {
                          transactionsReducer.getTransaction.response?.data
                            .numeroCuentaInkambio
                        }
                      </RowValue>
                    </Card.Body>
                  </Fragment>
                )}
              </Card>
              <Timeline.Description>
                Nos encontramos verificando tu transferencia y la constancia que
                enviaste. Si aún nos has hecho la trasferencias, te sugerimos
                hacerlo ahora.
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.State>
              {renderDot(
                3,
                transactionsReducer.getTransaction.response?.data
                  .verificadoOrigen
                  ? 1
                  : 2,
                transactionsReducer.getTransaction.response?.data
                  .verificadoOrigen,
                false,
                !transactionsReducer.getTransaction.response?.data
                  .verificadoOrigen
              )}
            </Timeline.State>
            <Timeline.Content>
              <Timeline.Title waiting>Espera un poco más</Timeline.Title>
              <Timeline.Description waiting>
                Estamos realizando el envió de tu cambio, falta poco para que
                este se encuentre en tu cuenta.
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
        <Button
          type="primary"
          onPress={() => {
            dispatch(
              operationSlide.setForm({
                send: null,
                recived: null,
                cupon: null,
              })
            )
            dispatch(transactionsSlide.cleanByKey({ key: 'getTransaction' }));
            dispatch(operationSlide.setStep({ step: 1 }));
            navigation.goBack();
          }}
        >
          <Button.Text type="primary">IR AL INICIO</Button.Text>
        </Button>
        {/* <Button
          type="outline"
          onPress={() => {
            navigation.navigate('HistoryStack');
          }}
        >
          <Button.Text type="outline">ÚLTIMOS MOVIMIENTOS</Button.Text>
        </Button> */}
      </Content>
    </>
  );
};

export default OperationDetailScreen;
