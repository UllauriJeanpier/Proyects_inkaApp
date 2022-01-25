import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const profilesSlice = createSlice({
  name: 'profiles',
  initialState: {
    getActivityEconomic: {
      onloading: false,
      error: null,
      response: null,
    },
    getSectorEconomic: {
      onloading: false,
      error: null,
      response: null,
    },
    getProfiles: {
      onloading: false,
      error: null,
      response: null,
    },
    setProfile: {
      onloading: false,
      error: null,
      response: null,
    },
    form: {},
    saveProfile: {
      onloading: false,
      error: null,
      response: null,
    },
  },
  reducers: {
    getProfilesStart: (state) => ({
      ...state,
      getProfiles: {
        ...state.getProfiles,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getProfilesSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getProfiles: {
        ...state.getProfiles,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getProfilesFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getProfiles: {
        ...state.getProfiles,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    setProfileStart: (state) => ({
      ...state,
      setProfile: {
        ...state.setProfile,
        loading: true,
        response: null,
        error: null,
      },
    }),
    setProfileSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      setProfile: {
        ...state.setProfile,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    setProfileFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      setProfile: {
        ...state.setProfile,
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
    getActivityEconomicStart: (state) => ({
      ...state,
      getActivityEconomic: {
        ...state.getActivityEconomic,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getActivityEconomicSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getActivityEconomic: {
        ...state.getActivityEconomic,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getActivityEconomicFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getActivityEconomic: {
        ...state.getActivityEconomic,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    getSectorEconomicStart: (state) => ({
      ...state,
      getSectorEconomic: {
        ...state.getSectorEconomic,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getSectorEconomicSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getSectorEconomic: {
        ...state.getSectorEconomic,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getSectorEconomicFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getSectorEconomic: {
        ...state.getSectorEconomic,
        loading: false,
        response: null,
        error: payload,
      },
    }),
    saveProfileStart: (state) => ({
      ...state,
      saveProfile: {
        ...state.saveProfile,
        loading: true,
        response: null,
        error: null,
      },
    }),
    saveProfileSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      saveProfile: {
        ...state.saveProfile,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    saveProfileFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      saveProfile: {
        ...state.saveProfile,
        loading: false,
        response: null,
        error: payload,
      },
    }),
  },
});

export const {
  getProfilesStart,
  getProfilesSuccess,
  getProfilesFail,
  setProfileStart,
  setProfileSuccess,
  setProfileFail,
  cleanByKey,
  setForm,
  cleanForm,
  getActivityEconomicStart,
  getActivityEconomicSuccess,
  getActivityEconomicFail,
  getSectorEconomicStart,
  getSectorEconomicSuccess,
  getSectorEconomicFail,
  saveProfileStart,
  saveProfileSuccess,
  saveProfileFail,
} = profilesSlice.actions;

export { profilesSlice };

export default profilesSlice.reducer;
