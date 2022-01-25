import * as fundActions from '@redux/slices/originFund';
import * as calls from '@services/api/calls';

export const getFunds = (payload: any) => async (dispatch: any) => {
  dispatch(fundActions.getFundsStart())
  try {
    const response = await calls.callGetFoundsList()
    if (response?.data.success) {
      dispatch(
        fundActions.getFundsSuccess({
          data: response.data.data
        })
      );
    } else {
      dispatch(fundActions.getFundsFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(fundActions.getFundsFail({ error }));
    dispatch(fundActions.cleanByKey({ key: 'getFunds' }));
  }
}