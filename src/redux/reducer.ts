import { combineReducers } from '@reduxjs/toolkit';
import user from './slices/user';
import auth from './slices/auth';
import typeDocs from './slices/typeDocs';
import accounts from './slices/accounts';
import banks from './slices/banks';
import transactions from './slices/transactions';
import operations from './slices/operations';
import profiles from './slices/profiles';
import originFund from './slices/originFund'

const rootReducer = combineReducers({
  user,
  auth,
  typeDocs,
  accounts,
  banks,
  transactions,
  operations,
  profiles,
  originFund
});

export { rootReducer };
