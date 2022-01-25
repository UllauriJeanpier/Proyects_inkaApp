import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    getTransaction: {
      onloading: false,
      error: null,
      response: null,
    },
    sendTransaction: {
      onloading: false,
      error: null,
      response: null,
    },
    confirmTransaction: {
      onloading: false,
      error: null,
      response: null,
    },
    getTransactions: {
      onloading: false,
      error: null,
      response: null,
    },
    getTransactionsByState: {
      onloading: false,
      error: null,
      response: null,
    },
    getStatesTransactions: {
      onloading: false,
      error: null,
      response: null,
    },
  },
  reducers: {
    getTransactionStart: (state) => ({
      ...state,
      getTransaction: {
        ...state.getTransaction,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getTransactionSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getTransaction: {
        ...state.getTransaction,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getTransactionFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getTransaction: {
        ...state.getTransaction,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    sendTransactionStart: (state) => ({
      ...state,
      sendTransaction: {
        ...state.sendTransaction,
        loading: true,
        response: null,
        error: null,
      },
    }),
    sendTransactionSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      sendTransaction: {
        ...state.sendTransaction,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    sendTransactionFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      sendTransaction: {
        ...state.sendTransaction,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    confirmTransactionStart: (state) => ({
      ...state,
      confirmTransaction: {
        ...state.confirmTransaction,
        loading: true,
        response: null,
        error: null,
      },
    }),
    confirmTransactionSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      confirmTransaction: {
        ...state.confirmTransaction,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    confirmTransactionFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      confirmTransaction: {
        ...state.confirmTransaction,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    getTransactionsStart: (state) => ({
      ...state,
      getTransactions: {
        ...state.getTransactions,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getTransactionsSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getTransactions: {
        ...state.getTransactions,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getTransactionsFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getTransactions: {
        ...state.getTransactions,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    getTransactionsByStateStart: (state) => ({
      ...state,
      getTransactionsByState: {
        ...state.getTransactionsByState,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getTransactionsByStateSuccess: (
      state,
      { payload }: PayloadAction<any>
    ) => ({
      ...state,
      getTransactionsByState: {
        ...state.getTransactionsByState,
        loading: false,
        response: {
          ...(state.getTransactionsByState.response || {}),
          ...payload.data,
        },
        error: null,
      },
    }),
    getTransactionsByStateFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getTransactionsByState: {
        ...state.getTransactionsByState,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    getStatesTransactionsStart: (state) => ({
      ...state,
      getStatesTransactions: {
        ...state.getStatesTransactions,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getStatesTransactionsSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getStatesTransactions: {
        ...state.getStatesTransactions,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getStatesTransactionsFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getStatesTransactions: {
        ...state.getStatesTransactions,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    cleanByKey: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      [payload.key]: {
        onloading: false,
        error: null,
        response: null,
      },
    }),
  },
});

export const {
  getTransactionStart,
  getTransactionSuccess,
  getTransactionFail,
  sendTransactionStart,
  sendTransactionSuccess,
  sendTransactionFail,
  confirmTransactionStart,
  confirmTransactionSuccess,
  confirmTransactionFail,
  getTransactionsStart,
  getTransactionsSuccess,
  getTransactionsFail,
  getTransactionsByStateStart,
  getTransactionsByStateSuccess,
  getTransactionsByStateFail,
  getStatesTransactionsStart,
  getStatesTransactionsSuccess,
  getStatesTransactionsFail,
  cleanByKey,
} = transactionsSlice.actions;

export { transactionsSlice };

export default transactionsSlice.reducer;
