import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SvgUri } from 'react-native-svg';
import { RootStackParamList } from 'src/routes';
import { useTransactionsSelector, useAppDispatch } from '@hooks';
import * as transactionsSlide from '@redux/slices/transactions';
import * as transactionsActions from '@redux/actions/transactions';

import { GroupText } from './styles';
import { Header, Content, Loader } from '@components';
import { FORMAT_DECIMALS_LENGTH } from '@utils/constants';
import { getRouteFile } from '@utils/functions';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'HistoryDetailScreen'>;
}

const HistoryDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const transactionsReducer: any = useTransactionsSelector();

  useEffect(() => {
    dispatch(transactionsSlide.cleanByKey({ key: 'getTransaction' }));
    dispatch(transactionsActions.getTransaction({ id: route?.params.id }));
  }, []);

  if (
    transactionsReducer.getTransaction.onloading ||
    !transactionsReducer.getTransaction.response
  ) {
    return (
      <>
        <Header>
          <Header.ArrowBack navigation={navigation} />
          <Header.Title internal>
            Resumen - Operación N° {route?.params.number || ''}
          </Header.Title>
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
        <Header.Title internal>
          Resumen - Operación N° {route?.params.number || ''}
        </Header.Title>
      </Header>
      <Content>
        <GroupText>
          <GroupText.Label>Número de Operación</GroupText.Label>
          <GroupText.Value>
            N° {transactionsReducer.getTransaction.response?.data.numero}
          </GroupText.Value>
        </GroupText>
        <GroupText>
          <GroupText.Label>
            Monto transferiado a la cuenta de Inkambio
          </GroupText.Label>
          <GroupText.Value>
            {transactionsReducer.getTransaction.response?.data.monedaDestino}{' '}
            {parseFloat(
              transactionsReducer.getTransaction.response?.data.montoDestino
            ).toFixed(FORMAT_DECIMALS_LENGTH)}
          </GroupText.Value>
        </GroupText>
        <GroupText>
          <GroupText.Label>Monto que recibiras en tu cuentas</GroupText.Label>
          <GroupText.Value>
            {transactionsReducer.getTransaction.response?.data.monedaOrigen}{' '}
            {parseFloat(
              transactionsReducer.getTransaction.response?.data.montoOrigen
            ).toFixed(FORMAT_DECIMALS_LENGTH)}
          </GroupText.Value>
        </GroupText>
        <GroupText>
          <GroupText.Label>Tipo de cambio</GroupText.Label>
          <GroupText.Value>
            S/. {transactionsReducer.getTransaction.response?.data.tipoCambio}
          </GroupText.Value>
        </GroupText>
        <GroupText>
          <GroupText.Label>Cuenta de Origen</GroupText.Label>
          <GroupText.WithImg>
            <GroupText.Img>
              <SvgUri
                height={35}
                width={35}
                uri={getRouteFile(
                  transactionsReducer.getTransaction.response?.data.bancoOrigen
                )}
              />
            </GroupText.Img>
            <GroupText.Value>
              {transactionsReducer.getTransaction.response?.data.cuentaOrigen} -{' '}
              {
                transactionsReducer.getTransaction.response?.data
                  .numeroCuentaOrigen
              }
            </GroupText.Value>
          </GroupText.WithImg>
        </GroupText>
        <GroupText>
          <GroupText.Label>Cuenta de Destino</GroupText.Label>
          <GroupText.WithImg>
            <GroupText.Img>
              <SvgUri
                height={35}
                width={35}
                uri={getRouteFile(
                  transactionsReducer.getTransaction.response?.data.bancoDestino
                )}
              />
            </GroupText.Img>
            <GroupText.Value>
              {transactionsReducer.getTransaction.response?.data.cuentaDestino}{' '}
              -{' '}
              {
                transactionsReducer.getTransaction.response?.data
                  .numeroCuentaDestino
              }
            </GroupText.Value>
          </GroupText.WithImg>
        </GroupText>
        <GroupText>
          <GroupText.Label>Cuenta Inkambio</GroupText.Label>
          <GroupText.WithImg>
            <GroupText.Img>
              <SvgUri
                height={35}
                width={35}
                uri={getRouteFile(
                  transactionsReducer.getTransaction.response?.data
                    .bancoInkambio
                )}
              />
            </GroupText.Img>
            <GroupText.Value>
              {transactionsReducer.getTransaction.response?.data.cuentaInkambio}{' '}
              -{' '}
              {
                transactionsReducer.getTransaction.response?.data
                  .numeroCuentaInkambio
              }
            </GroupText.Value>
          </GroupText.WithImg>
        </GroupText>
      </Content>
    </>
  );
};

export default HistoryDetailScreen;
