import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    form: {},
    getUser: {
      loading: false,
      response: null,
      error: null,
    },
    saveUser: {
      loading: false,
      response: null,
      error: null,
    },
    getImageUser: {
      loading: false,
      response: null,
      error: null,
    },
    saveImageUser: {
      loading: false,
      response: null,
      error: null,
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
    getUserStart: (state) => ({
      ...state,
      getUser: {
        ...state.getUser,
        loading: true,
        error: null,
      },
    }),
    getUserSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getUser: {
        ...state.getUser,
        loading: false,
        response: payload.data,
      },
    }),
    getUserFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getUser: {
        ...state.getUser,
        loading: false,
        error: payload,
      },
    }),
    getImageUserStart: (state) => ({
      ...state,
      getImageUser: {
        ...state.getImageUser,
        loading: true,
        error: null,
      },
    }),
    getImageUserSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getImageUser: {
        ...state.getImageUser,
        loading: false,
        response: payload.data,
      },
    }),
    getImageUserFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getImageUser: {
        ...state.getImageUser,
        loading: false,
        error: payload,
      },
    }),
    saveUserStart: (state) => ({
      ...state,
      saveUser: {
        ...state.saveUser,
        loading: true,
        error: null,
      },
    }),
    saveUserSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      saveUser: {
        ...state.saveUser,
        loading: false,
        response: payload.data,
      },
    }),
    saveUserFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      saveUser: {
        ...state.saveUser,
        loading: false,
        error: payload,
      },
    }),
    saveImageUserStart: (state) => ({
      ...state,
      saveImageUser: {
        ...state.saveImageUser,
        loading: true,
        error: null,
      },
    }),
    saveImageUserSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      saveImageUser: {
        ...state.saveImageUser,
        loading: false,
        response: payload.data,
      },
    }),
    saveImageUserFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      saveImageUser: {
        ...state.saveImageUser,
        loading: false,
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
  getUserStart,
  getUserSuccess,
  getUserFail,
  getImageUserStart,
  getImageUserSuccess,
  getImageUserFail,
  saveUserStart,
  saveUserSuccess,
  saveUserFail,
  saveImageUserStart,
  saveImageUserSuccess,
  saveImageUserFail,
  cleanByKey,
} = userSlice.actions;

export { userSlice };

export default userSlice.reducer;
