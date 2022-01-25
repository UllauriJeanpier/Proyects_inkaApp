import * as operationsActions from '@redux/slices/operations';
import * as calls from '@services/api/calls';
import { PayloadProps } from './payload';

export const getCurrentChange = () => async (dispatch: any) => {
  dispatch(operationsActions.getCurrentChangeStart());

  try {
    const response = await calls.callGetCurrentChange(new Date().getTime());
    if (response.data.success) {
      dispatch(
        operationsActions.getCurrentChangeSuccess({ data: response.data })
      );
    } else {
      dispatch(
        operationsActions.getCurrentChangeFail({ error: 'Tuvimos problemas' })
      );
    }
  } catch (error) {
    dispatch(operationsActions.getCurrentChangeFail({ error }));
    dispatch(operationsActions.cleanByKey({ key: 'getCurrentChange' }));
  }
};
