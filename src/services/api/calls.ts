import qs from 'qs';
import api from './';
import * as paths from '@utils/paths';
import * as constants from '@utils/constants';

export const callLogin = (payload: any) =>
  api({
    url: paths.ROUTE_POST_LOGIN,
    headers: constants.HEADER_FORM_DATA,
    data: qs.stringify(payload),
  });

export const callRecoverPassword = (payload: any) =>
  api({
    url: paths.ROUTE_POST_FORGET_PASSWORD,
    data: payload,
  });

export const callChangePassword = (payload: any) =>
  api({
    url: paths.ROUTE_POST_CHANGE_PASSWORD,
    data: payload,
  });

export const callGetTypeDocs = () =>
  api({ url: paths.ROUTE_GET_TYPES_DOCUMENTS, method: 'GET' });

export const callSignUp = (payload: any) =>
  api({ url: paths.ROUTE_POST_REGISTER_USER, data: payload });

export const callGetAccounts = () =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_ACCOUNTS_BANK,
    authorization: true,
  });

export const callGetBanks = (payload: any) =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_BANKS,
    data: payload,
    authorization: true,
  });

export const callGetPounds = (payload: any) =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_POUNDS,
    data: payload,
    authorization: true,
  });

export const callGetTypeAccounts = (payload: any) =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_TYPE_ACCOUNTS,
    data: payload,
    authorization: true,
  });

export const callDeleteAccount = (payload: any) =>
  api({
    method: 'DELETE',
    url: paths.ROUTE_DELETE_ACCOUNTS_BANK(payload),
    authorization: true,
  });

export const callGetStatesTransactions = (payload: any) =>
  api({
    authorization: true,
    url: paths.ROUTE_GET_TYPES_OPERATIONS,
    method: 'GET',
  });

export const callGetTransactionsByState = (payload: any) =>
  api({
    authorization: true,
    url: paths.ROUTE_GET_OPERATIONS_BY_TYPES(payload.state),
    method: 'GET',
  });

export const callGetTransaction = (payload: any) =>
  api({
    authorization: true,
    url: paths.ROUTE_GET_OPERATION(payload.id),
    method: 'GET',
  });

export const callGetCurrentChange = (payload: any) =>
  api({
    url: paths.ROUTE_GET_TYPE_CHANGE(payload),
    method: 'GET',
  });

export const callSendTransaction = (payload: any) =>
  api({
    url: paths.ROUTE_POST_REGISTER_OPERATION,
    data: payload,
    authorization: true,
  });

export const callConfirmTransaction = (payload: any) =>
  api({
    url: paths.ROUTE_POST_CONFIRM_OPERATION(payload.id),
    data: payload,
    authorization: true,
  });

export const callGetUser = () =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_USER,
    authorization: true,
  });

export const callSaveUser = (payload: any) =>
  api({
    method: 'PUT',
    url: paths.ROUTE_GET_USER,
    data: payload,
    authorization: true,
  });

export const callGetImageUser = () =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_IMAGE_USER,
    authorization: true,
  });

export const callSaveImageUser = (payload: any) =>
  api({
    method: 'POST',
    url: paths.ROUTE_POST_IMAGE_USER,
    headers: constants.HEADER_FORM_DATA,
    data: payload,
    authorization: true,
  });

export const callGetProfiles = () =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_PROFILES_USER,
    authorization: true,
  });

export const callSetProfile = (payload: any) =>
  api({
    method: 'POST',
    url: paths.ROUTE_POST_PROFILE_USER,
    authorization: true,
    data: payload,
  });

export const callGetSectorEconomico = () =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_SECTOR_ECONOMICO,
    authorization: true,
  });

export const callGetActividadEconomica = () =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_ACTIVIDAD_ECONOMICA,
    authorization: true,
  });

export const callSaveProfileCompany = (payload: any) =>
  api({
    method: 'POST',
    url: paths.ROUTE_POST_PROFILE_COMPANY,
    authorization: true,
    data: payload,
  });

export const callGetFoundsList = () =>
  api({
    method: 'GET',
    url: paths.ROUTE_GET_FOUNDS_LIST,
    authorization: true,
  })
