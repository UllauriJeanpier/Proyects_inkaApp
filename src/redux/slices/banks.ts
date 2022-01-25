import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const banksSlice = createSlice({
  name: 'banks',
  initialState: {
    getBanks: {
      onloading: false,
      error: null,
      response: null,
    },
    getTypeAccounts: {
      onloading: false,
      error: null,
      response: null,
    },
    getPounds: {
      onloading: false,
      error: null,
      response: null,
    },
  },
  reducers: {
    getBanksStart: (state) => ({
      ...state,
      getBanks: {
        ...state.getBanks,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getBanksSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getBanks: {
        ...state.getBanks,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getBanksFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getBanks: {
        ...state.getBanks,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    getTypeAccountsStart: (state) => ({
      ...state,
      getTypeAccounts: {
        ...state.getTypeAccounts,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getTypeAccountsSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getTypeAccounts: {
        ...state.getTypeAccounts,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getTypeAccountsFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getTypeAccounts: {
        ...state.getTypeAccounts,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    getPoundsStart: (state) => ({
      ...state,
      getPounds: {
        ...state.getPounds,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getPoundsSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getPounds: {
        ...state.getPounds,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getPoundsFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getPounds: {
        ...state.getPounds,
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
  getBanksStart,
  getBanksSuccess,
  getBanksFail,
  getTypeAccountsStart,
  getTypeAccountsSuccess,
  getTypeAccountsFail,
  getPoundsStart,
  getPoundsSuccess,
  getPoundsFail,
  cleanByKey,
} = banksSlice.actions;

export { banksSlice };

export default banksSlice.reducer;
