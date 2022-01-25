import * as typeDocsActions from '@redux/slices/typeDocs';
import * as calls from '@services/api/calls';

export const getTypeDocs = (payload: any) => async (dispatch: any) => {
  dispatch(typeDocsActions.getTypeDocsStart());

  try {
    const response = await calls.callGetTypeDocs();

    if (response.data.success) {
      dispatch(typeDocsActions.getTypeDocsSuccess({ data: response.data }));
    } else {
      dispatch(typeDocsActions.getTypeDocsFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(typeDocsActions.getTypeDocsFail({ error }));
    dispatch(typeDocsActions.cleanByKey({ key: 'getTypeDocs' }));
  }
};