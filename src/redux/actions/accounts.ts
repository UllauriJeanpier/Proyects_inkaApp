import * as accountsActions from '@redux/slices/accounts';
import * as calls from '@services/api/calls';
import * as accountsTransform from '../transforms/accounts';
import * as paths from '@utils/paths';
import api from '@services/api';
import { PayloadProps } from './payload';

export const getAccounts = (payload: any) => async (dispatch: any) => {
  dispatch(accountsActions.getAccountsStart());

  try {
    const response: any = await calls.callGetAccounts();

    if (response?.data.success) {
      dispatch(
        accountsActions.getAccountsSuccess({
          data: {
            group: accountsTransform.formatAccountsBankGroup(
              response.data.data.items
            ),
            list: accountsTransform.formatAccountsBank(
              response.data.data.items
            ),
          },
        })
      );
    } else {
      dispatch(accountsActions.getAccountsFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(accountsActions.getAccountsFail({ error }));
    dispatch(accountsActions.cleanByKey({ key: 'getAccounts' }));
  }
};

export const saveAccount = (payload: PayloadProps) => async (dispatch: any) => {
  try {
    payload.start();
    dispatch(accountsActions.saveAccountStart());

    const method = payload.data?.id ? 'PUT' : 'POST';
    const url = payload.data?.id
      ? paths.ROUTE_UPDATE_ACCOUNTS_BANK(payload.data.id)
      : paths.ROUTE_POST_SAVE_ACCOUNT;
    const response = await api({
      method,
      url,
      data: payload.data,
      authorization: true,
    });

    if (response?.data.success) {
      dispatch(
        accountsActions.saveAccountSuccess({
          data: response.data,
        })
      );
      payload.success();
    } else {
      payload.error();
      dispatch(accountsActions.saveAccountFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(accountsActions.saveAccountFail({ error }));
    dispatch(accountsActions.cleanByKey({ key: 'saveAccount' }));
  } finally {
    payload.finally();
  }
};

export const deleteAccount =
  (payload: PayloadProps) => async (dispatch: any) => {
    try {
      payload.start();
      dispatch(accountsActions.deleteAccountStart());

      const response: any = await calls.callDeleteAccount(payload.data);

      if (response?.data.success) {
        dispatch(
          accountsActions.deleteAccountSuccess({
            data: response.data,
          })
        );
        payload.success();
      } else {
        dispatch(
          accountsActions.deleteAccountFail({ error: 'Tuvimos problemas' })
        );
        payload.error();
      }
    } catch (error) {
      dispatch(accountsActions.deleteAccountFail({ error }));
      dispatch(accountsActions.cleanByKey({ key: 'deleteAccount' }));
    } finally {
      payload.finally();
    }
  };
