import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['auth/setForm'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'auth.form.date', 'payload.date', 'payload.error'],
      // Ignore these paths in the state
      ignoredPaths: ['items.date'],
    },
  }),
});

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./reducer', () => {
//     const newRootReducer = require('./reducer').rootReducer;
//     store.replaceReducer(newRootReducer);
//   });
// }

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
