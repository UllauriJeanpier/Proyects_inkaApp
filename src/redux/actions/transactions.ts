import * as transactionsActions from '@redux/slices/transactions';
import * as calls from '@services/api/calls';
import { PayloadProps } from './payload';

export const getStatesTransactions =
  (payload: any) => async (dispatch: any) => {
    dispatch(transactionsActions.getStatesTransactionsStart());

    try {
      const response = await calls.callGetStatesTransactions({});

      if (response.data.success) {
        dispatch(
          transactionsActions.getStatesTransactionsSuccess({
            data: response.data,
          })
        );
      } else {
        dispatch(
          transactionsActions.getStatesTransactionsFail({
            error: 'Tuvimos problemas',
          })
        );
      }
    } catch (error) {
      dispatch(transactionsActions.getStatesTransactionsFail({ error }));
      dispatch(
        transactionsActions.cleanByKey({ key: 'getStatesTransactions' })
      );
    }
  };

export const getTransactionsByState =
  (payload: any) => async (dispatch: any) => {
    dispatch(transactionsActions.getTransactionsByStateStart());

    try {
      const response = await calls.callGetTransactionsByState({
        state: payload.state,
      });

      if (response.data.success) {
        dispatch(
          transactionsActions.getTransactionsByStateSuccess({
            data: { [payload.state]: response.data },
          })
        );
      } else {
        dispatch(
          transactionsActions.getTransactionsByStateFail({
            error: 'Tuvimos problemas',
          })
        );
      }
    } catch (error) {
      dispatch(transactionsActions.getTransactionsByStateFail({ error }));
    }
  };

export const getTransaction = (payload: any) => async (dispatch: any) => {
  dispatch(transactionsActions.getTransactionStart());

  try {
    const response = await calls.callGetTransaction({ id: payload.id });
    if (response.data.success) {
      dispatch(
        transactionsActions.getTransactionSuccess({
          data: response.data,
        })
      );
    } else {
      dispatch(
        transactionsActions.getTransactionFail({
          error: 'Tuvimos problemas',
        })
      );
    }
  } catch (error) {
    dispatch(transactionsActions.getTransactionFail({ error }));
    dispatch(transactionsActions.cleanByKey({ key: 'getTransaction' }));
  }
};

export const sendTransaction =
  (payload: PayloadProps) => async (dispatch: any) => {
    payload.start();
    dispatch(transactionsActions.sendTransactionStart());

    try {
      const response = await calls.callSendTransaction(payload.data);

      if (response.data.success) {
        dispatch(
          transactionsActions.sendTransactionSuccess({
            data: response.data,
          })
        );
        payload.success();
      } else {
        dispatch(transactionsActions.sendTransactionFail(response.data));
        payload.error();
      }
    } catch (error) {
      dispatch(transactionsActions.sendTransactionFail({ error }));
      dispatch(transactionsActions.cleanByKey({ key: 'sendTransaction' }));
    } finally {
      payload.finally();
    }
  };

export const confirmTransaction =
  (payload: PayloadProps) => async (dispatch: any) => {
    payload.start();
    dispatch(transactionsActions.confirmTransactionStart());

    try {
      const response = await calls.callConfirmTransaction(payload.data);

      if (response.data.success) {
        dispatch(
          transactionsActions.confirmTransactionSuccess({
            data: response.data,
          })
        );
        payload.success();
      } else {
        dispatch(transactionsActions.confirmTransactionFail(response.data));
        payload.error();
      }
    } catch (error) {
      dispatch(transactionsActions.confirmTransactionFail({ error }));
      dispatch(transactionsActions.cleanByKey({ key: 'confirmTransaction' }));
    } finally {
      payload.finally();
    }
  };
