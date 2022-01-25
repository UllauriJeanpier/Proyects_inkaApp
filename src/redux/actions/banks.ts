import * as banksActions from '@redux/slices/banks';
import * as calls from '@services/api/calls';
import * as banksTransform from '../transforms/banks';

export const getBanks = (payload: any) => async (dispatch: any) => {
  dispatch(banksActions.getBanksStart());

  try {
    const response: any = await calls.callGetBanks(payload);

    if (response?.data.success) {
      dispatch(
        banksActions.getBanksSuccess({
          data: banksTransform.formatBanks(response.data.data),
        })
      );
    } else {
      dispatch(banksActions.getBanksFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(banksActions.getBanksFail({ error }));
    dispatch(banksActions.cleanByKey({ key: 'getBanks' }));
  }
};

export const getPounds = (payload: any) => async (dispatch: any) => {
  dispatch(banksActions.getPoundsStart());

  try {
    const response: any = await calls.callGetPounds(payload);

    if (response?.data.success) {
      dispatch(
        banksActions.getPoundsSuccess({
          data: banksTransform.formatPounds(response.data.data),
        })
      );
    } else {
      dispatch(banksActions.getPoundsFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(banksActions.getPoundsFail({ error }));
    dispatch(banksActions.cleanByKey({ key: 'getPounds' }));
  }
};

export const getTypeAccounts = (payload: any) => async (dispatch: any) => {
  dispatch(banksActions.getTypeAccountsStart());

  try {
    const response: any = await calls.callGetTypeAccounts(payload);

    if (response?.data.success) {
      dispatch(
        banksActions.getTypeAccountsSuccess({
          data: banksTransform.formatTypeAccounts(response.data.data),
        })
      );
    } else {
      dispatch(banksActions.getPoundsFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(banksActions.getPoundsFail({ error }));
    dispatch(banksActions.cleanByKey({ key: 'getTypeAccounts' }));
  }
};
