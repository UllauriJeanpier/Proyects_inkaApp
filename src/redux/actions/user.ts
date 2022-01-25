import * as userActions from '@redux/slices/user';
import * as calls from '@services/api/calls';
import { PayloadProps } from './payload';

export const getUser = () => async (dispatch: any) => {
  dispatch(userActions.getUserStart());

  try {
    const response = await calls.callGetUser();

    if (response.data.success) {
      dispatch(userActions.getUserSuccess({ data: response.data }));
    } else {
      dispatch(userActions.getUserFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(userActions.getUserFail({ error }));
    dispatch(userActions.cleanByKey({ key: 'getUser' }));
  }
};

export const getImageUser = () => async (dispatch: any) => {
  dispatch(userActions.getImageUserStart());

  try {
    const response = await calls.callGetImageUser();

    if (response.data.success) {
      dispatch(userActions.getImageUserSuccess({ data: response.data }));
    } else {
      dispatch(userActions.getImageUserFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(userActions.getImageUserFail({ error }));
    dispatch(userActions.cleanByKey({ key: 'getImageUser' }));
  }
};

export const saveUser = (payload: PayloadProps) => async (dispatch: any) => {
  payload.start();
  dispatch(userActions.saveUserStart());

  try {
    const response = await calls.callSaveUser(payload.data);

    if (response.data.success) {
      dispatch(userActions.saveUserSuccess({ data: response.data }));
      payload.success();
    } else {
      dispatch(userActions.saveUserFail({ error: 'Tuvimos problemas' }));
      payload.error();
    }
  } catch (error) {
    dispatch(userActions.saveUserFail({ error }));
    dispatch(userActions.cleanByKey({ key: 'saveUser' }));
  } finally {
    payload.finally();
  }
};

export const saveImageUser =
  (payload: PayloadProps) => async (dispatch: any) => {
    payload.start();
    dispatch(userActions.saveImageUserStart());

    try {
      const response = await calls.callSaveImageUser(payload.data);

      if (response.data.success) {
        dispatch(userActions.saveImageUserSuccess({ data: response.data }));
        payload.success();
      } else {
        dispatch(userActions.saveImageUserFail({ error: 'Tuvimos problemas' }));
        payload.error();
      }
    } catch (error) {
      dispatch(userActions.saveImageUserFail({ error }));
      dispatch(userActions.cleanByKey({ key: 'saveImageUser' }));
    } finally {
      payload.finally();
    }
  };
