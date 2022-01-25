import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    form: {},
    logIn: {
      onloading: false,
      error: null,
      response: null,
    },
    forgetPassword: {
      onloading: false,
      error: null,
      response: null,
    },
    changePassword: {
      onloading: false,
      error: null,
      response: null,
    },
    signUp: {
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
    cleanByKey: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      [payload.key]: {
        onloading: false,
        error: null,
        response: null,
      },
    }),
    logInStart: (state) => ({
      ...state,
      logIn: {
        ...state.logIn,
        loading: true,
        error: null,
        response: null,
      },
    }),
    logInSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      logIn: {
        ...state.logIn,
        loading: false,
        error: null,
        response: payload.data,
      },
    }),
    logInFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      logIn: {
        ...state.logIn,
        loading: false,
        error: payload,
        response: null,
      },
    }),
    forgetPasswordStart: (state) => ({
      ...state,
      forgetPassword: {
        ...state.forgetPassword,
        loading: true,
        error: null,
        response: null,
      },
    }),
    forgetPasswordSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      forgetPassword: {
        ...state.forgetPassword,
        loading: false,
        error: null,
        response: payload.data,
      },
    }),
    forgetPasswordFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      forgetPassword: {
        ...state.forgetPassword,
        loading: false,
        error: payload,
        response: null,
      },
    }),
    changePasswordStart: (state) => ({
      ...state,
      changePassword: {
        ...state.changePassword,
        loading: true,
        error: null,
        response: null,
      },
    }),
    changePasswordSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      changePassword: {
        ...state.changePassword,
        loading: false,
        error: null,
        response: payload.data,
      },
    }),
    changePasswordFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      changePassword: {
        ...state.changePassword,
        loading: false,
        error: payload,
        response: null,
      },
    }),
    signUpStart: (state) => ({
      ...state,
      signUp: {
        ...state.signUp,
        loading: true,
        error: null,
        response: null,
      },
    }),
    signUpSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      signUp: {
        ...state.signUp,
        loading: false,
        error: null,
        response: payload.data,
      },
    }),
    signUpFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      signUp: {
        ...state.signUp,
        loading: false,
        error: payload,
        response: null,
      },
    }),
  },
});

export const {
  setForm,
  cleanForm,
  cleanByKey,
  logInStart,
  logInSuccess,
  logInFail,
  forgetPasswordStart,
  forgetPasswordSuccess,
  forgetPasswordFail,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFail,
  signUpStart,
  signUpSuccess,
  signUpFail,
} = authSlice.actions;

export { authSlice };

export default authSlice.reducer;
