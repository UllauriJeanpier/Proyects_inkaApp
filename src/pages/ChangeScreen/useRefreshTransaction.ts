import { useEffect, useState } from 'react';
import * as transactionsSlide from '@redux/slices/transactions';
import * as transactionsActions from '@redux/actions/transactions';
import {
  STATE_REGISTERED,
  STATE_IN_PROCESS,
  STATE_FINISHED,
  STATE_CANCELED,
} from '@utils/constants';
import { useAppDispatch } from '@hooks/redux';

const useRefreshTransaction = () => {

  const dispatch = useAppDispatch();
  const refreshAllTransactions = () => {
    dispatch(transactionsSlide.cleanByKey({ key: 'getTransactionsByState' }));
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
  }

  const refresTransactionsByState = (state: 1 | 2 | 3 | 4) => {
    dispatch(
      transactionsActions.getTransactionsByState({ state })
    );
  }

  return { refreshAllTransactions, refresTransactionsByState }
};

export default useRefreshTransaction;
