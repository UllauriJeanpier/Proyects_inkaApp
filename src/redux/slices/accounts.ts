import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: {
    form: {},
    getAccounts: {
      onloading: false,
      error: null,
      response: null,
    },
    saveAccount: {
      onloading: false,
      error: null,
      response: null,
    },
    deleteAccount: {
      onloading: false,
      error: null,
      response: null,
    },
  },
  reducers: {
    setForm: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      form: {
        ...(state.form || {}),
        ...(payload || {}),
      },
    }),
    cleanForm: (state) => ({
      ...state,
      form: {},
    }),
    getAccountsStart: (state) => ({
      ...state,
      getAccounts: {
        ...state.getAccounts,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getAccountsSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getAccounts: {
        ...state.getAccounts,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getAccountsFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getAccounts: {
        ...state.getAccounts,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    saveAccountStart: (state) => ({
      ...state,
      saveAccount: {
        ...state.saveAccount,
        loading: true,
        response: null,
        error: null,
      },
    }),
    saveAccountSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      saveAccount: {
        ...state.saveAccount,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    saveAccountFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      saveAccount: {
        ...state.saveAccount,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    deleteAccountStart: (state) => ({
      ...state,
      deleteAccount: {
        ...state.deleteAccount,
        loading: true,
        response: null,
        error: null,
      },
    }),
    deleteAccountSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      deleteAccount: {
        ...state.deleteAccount,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    deleteAccountFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      deleteAccount: {
        ...state.deleteAccount,
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
  setForm,
  cleanForm,
  getAccountsStart,
  getAccountsSuccess,
  getAccountsFail,
  saveAccountStart,
  saveAccountSuccess,
  saveAccountFail,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFail,
  cleanByKey,
} = accountsSlice.actions;

export { accountsSlice };

export default accountsSlice.reducer;
