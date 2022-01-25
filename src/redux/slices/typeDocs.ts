import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const typeDocsSlice = createSlice({
  name: 'typeDocs',
  initialState: {
    getTypeDocs: {
      onloading: false,
      error: null,
      response: null,
    },
  },
  reducers: {
    getTypeDocsStart: (state) => ({
      ...state,
      getTypeDocs: {
        ...state.getTypeDocs,
        loading: true,
        response: null,
        error: null,
      },
    }),
    getTypeDocsSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getTypeDocs: {
        ...state.getTypeDocs,
        loading: false,
        response: payload.data,
        error: null,
      },
    }),
    getTypeDocsFail: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      getTypeDocs: {
        ...state.getTypeDocs,
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
  getTypeDocsStart,
  getTypeDocsSuccess,
  getTypeDocsFail,
  cleanByKey,
} = typeDocsSlice.actions;

export { typeDocsSlice };

export default typeDocsSlice.reducer;
