import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    form: {},
    processOperation: false,
    currentStep: 1,
    getCurrentChange: {
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
    setStep: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      currentStep: payload.step,
    }),
    setProcess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      processOperation: payload.process,
    }),
    getCurrentChangeStart: (state) => ({
      ...state,
      getCurrentChange: {
        ...state.getCurrentChange,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getCurrentChangeSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getCurrentChange: {
        ...state.getCurrentChange,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getCurrentChangeFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getCurrentChange: {
        ...state.getCurrentChange,
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
  setStep,
  setProcess,
  getCurrentChangeStart,
  getCurrentChangeSuccess,
  getCurrentChangeFail,
  cleanByKey,
} = operationsSlice.actions;

export { operationsSlice };

export default operationsSlice.reducer;
