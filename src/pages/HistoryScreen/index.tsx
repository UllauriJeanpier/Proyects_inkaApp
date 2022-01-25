import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import { RootStackParamList } from 'src/routes';
import emptyTransactions from '@assets/image/empty-transactions.png';
import { useTransactionsSelector, useAppDispatch } from '@hooks';
import * as transactionsSlide from '@redux/slices/transactions';
import * as transactionsActions from '@redux/actions/transactions';
import * as operationSlide from '@redux/slices/operations';
import {
  STATE_REGISTERED,
  STATE_IN_PROCESS,
  STATE_FINISHED,
  STATE_CANCELED,
  FORMAT_DECIMALS_LENGTH,
} from '@utils/constants';
import timerIcon from '@assets/icons/timer.png';
import arrowIcon from '@assets/icons/arrow-right.png';

import { Header, Content, Tabs, Icon, Copy, Image, Message } from '@components';
import { CardOperation, IconText, CardAction, ChangeValues } from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'HistoryScreen'>;
}

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const transactionsReducer: any = useTransactionsSelector();
  const [activeTab, setActiveTab] = useState<any>();

  useEffect(() => {
    dispatch(transactionsSlide.cleanByKey({ key: 'getStatesTransactions' }));
    dispatch(transactionsSlide.cleanByKey({ key: 'getTransactionsByState' }));
    dispatch(transactionsActions.getStatesTransactions({}));
    dispatch(
      transactionsActions.getTransactionsByState({ state: STATE_REGISTERED })
    );
    dispatch(
      transactionsActions.getTransactionsByState({ state: STATE_IN_PROCESS })
    );
    dispatch(
      transactionsActions.getTransactionsByState({ state: STATE_FINISHED })
    );
    dispatch(
      transactionsActions.getTransactionsByState({ state: STATE_CANCELED })
    );
    setActiveTab(STATE_REGISTERED);
  }, []);

  if (
    transactionsReducer.getTransactionsByState.response?.[STATE_REGISTERED]
      ?.data?.total +
      transactionsReducer.getTransactionsByState.response?.[STATE_IN_PROCESS]
        ?.data?.total +
      transactionsReducer.getTransactionsByState.response?.[STATE_FINISHED]
        ?.data?.total +
      transactionsReducer.getTransactionsByState.response?.[STATE_CANCELED]
        ?.data?.total ===
    0
  ) {
    return (
      <>
        <Header>
          <Header.Title>Mis Transacciones</Header.Title>
        </Header>
        <Content centered>
          <Image source={emptyTransactions} width={114} height={83} />
          <View style={{ marginBottom: 32 }} />
          <Copy>Aún no ha realizado ninguna{'\n'}operación</Copy>
        </Content>
      </>
    );
  }

  const seeDetail = (row: any) => {
    if (row.estado === STATE_FINISHED) {
      navigation.navigate('HistoryDetailScreen', {
        number: row.numero,
        id: row.id,
      });
    }

    if (row.estado === STATE_REGISTERED) {
      dispatch(transactionsSlide.cleanByKey({ key: 'getTransaction' }));
      dispatch(operationSlide.setStep({ step: 2 }));
      dispatch(
        transactionsActions.getTransaction({
          id: row.id,
        })
      );
      dispatch(
        operationSlide.setForm({
          send: null,
          recived: null,
          cupon: null,
        })
      )
      navigation.navigate('ChangeScreen');
    }

    if (row.estado === STATE_IN_PROCESS) {
      navigation.navigate('OperationDetailScreen', {
        id: row.id,
      });
    }
  };

  return (
    <>
      <Header>
        <Header.Title>Mis Transacciones</Header.Title>
      </Header>
      <Content>
        <Tabs>
          <Tabs.TabContent>
            {(
              transactionsReducer.getStatesTransactions.response?.data || []
            ).map((row: any, index: number) => (
              <Tabs.Tab
                onPress={() => setActiveTab(row.id)}
                key={`tab-${row.texto}`}
                active={activeTab === row.id}
                last={
                  (
                    transactionsReducer.getStatesTransactions.response?.data ||
                    []
                  ).length ===
                  index + 1
                }
              >
                <Tabs.TabText active={activeTab === row.id}>
                  {row.texto}
                </Tabs.TabText>
              </Tabs.Tab>
            ))}
          </Tabs.TabContent>
          <Tabs.TabPanes>
            {activeTab && (
              <Tabs.TabPane>
                {(
                  transactionsReducer.getTransactionsByState.response?.[
                    activeTab
                  ]?.data?.items || []
                ).map((row: any) => (
                  <Fragment key={row.id}>
                    <CardOperation header={`Operación - N° ${row.numero}`}>
                      {activeTab === STATE_REGISTERED ||
                      activeTab === STATE_IN_PROCESS ? (
                        <Message>
                          <Message.Icon>
                            <Image height={16} width={16} source={timerIcon} />
                          </Message.Icon>
                          <Message.Text>
                            Si no procede con la transferencia en{' '}
                            <Message.Text>25 minutos</Message.Text>, esta
                            operación se cancelara.
                          </Message.Text>
                        </Message>
                      ) : null}
                      <IconText>
                        <IconText.Icon>
                          <Icon name="calendar" size={16} color="#CCCCCC" />
                        </IconText.Icon>
                        <IconText.Label>
                          {moment(new Date(row.fecha))
                            .locale('es')
                            .format('LL')}
                        </IconText.Label>
                      </IconText>
                      <IconText>
                        <IconText.Icon>
                          <Icon name="clockcircleo" size={16} color="#CCCCCC" />
                        </IconText.Icon>
                        <IconText.Label>
                          {moment(new Date(row.fecha))
                            .locale('es')
                            .format('hh:mm A')}
                        </IconText.Label>
                      </IconText>
                      <ChangeValues>
                        <ChangeValues.Group>
                          <ChangeValues.Title>Envias:</ChangeValues.Title>
                          <ChangeValues.Value>
                            {row.monedaOrigen}{' '}
                            {parseFloat(row.montoOrigen).toFixed(
                              FORMAT_DECIMALS_LENGTH
                            )}
                          </ChangeValues.Value>
                        </ChangeValues.Group>
                        <Image width={20} height={10} source={arrowIcon} />
                        <ChangeValues.Group>
                          <ChangeValues.Title right>
                            Recibes:
                          </ChangeValues.Title>
                          <ChangeValues.Value right>
                            {row.monedaDestino}{' '}
                            {parseFloat(row.montoDestino).toFixed(
                              FORMAT_DECIMALS_LENGTH
                            )}
                          </ChangeValues.Value>
                        </ChangeValues.Group>
                      </ChangeValues>
                      {activeTab !== STATE_CANCELED && (
                        <CardAction
                          type="primary"
                          onPress={() => seeDetail(row)}
                        >
                          <CardAction.Text type="primary">
                            VER ESTADO
                          </CardAction.Text>
                        </CardAction>
                      )}
                    </CardOperation>
                  </Fragment>
                ))}
              </Tabs.TabPane>
            )}
          </Tabs.TabPanes>
        </Tabs>
      </Content>
    </>
  );
};

export default HistoryScreen;
