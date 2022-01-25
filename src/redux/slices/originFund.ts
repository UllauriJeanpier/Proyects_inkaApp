import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const originFundSlice = createSlice({
  name: 'originFund',
  initialState: {
    getFunds: {
      onloading: false,
      error: null,
      response: null,
    }
  },
  reducers: {
    getFundsStart: (state) => ({
      ...state,
      getFunds: {
        ...state.getFunds,
        loading: true,
        response: null,
        error: null,
      }
    }),
    getFundsSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getFunds: {
        ...state.getFunds,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getFundsFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getFunds: {
        ...state.getFunds,
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
  }
})

export const {
  getFundsStart,
  getFundsSuccess,
  getFundsFail,
  cleanByKey
} = originFundSlice.actions

export { originFundSlice };

export default originFundSlice.reducer;