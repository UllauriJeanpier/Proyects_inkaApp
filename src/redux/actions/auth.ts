import * as authActions from '@redux/slices/auth';
import * as calls from '@services/api/calls';
import * as storage from '@utils/storage';
import { PayloadProps } from './payload';

export const logIn = (payload: PayloadProps) => async (dispatch: any) => {
  payload.start();
  dispatch(authActions.logInStart());

  try {
    const response = await calls.callLogin(payload.data);

    if (response.data.success) {
      dispatch(authActions.logInSuccess({ data: response.data }));

      storage.setItem('sesion', response.data.data);
      payload.success();
    } else {
      payload.error();
    }
  } catch (error) {
    dispatch(authActions.logInFail({ error }));
    dispatch(authActions.cleanByKey({ key: 'logIn' }));
  } finally {
    payload.finally();
  }
};

export const forgetPassword =
  (payload: PayloadProps) => async (dispatch: any) => {
    try {
      payload.start();
      dispatch(authActions.forgetPasswordStart());

      const response = await calls.callRecoverPassword(payload.data);

      if (!response.data.success) {
        payload.error();
        dispatch(
          authActions.forgetPasswordFail({ error: 'Tuvimos problemas' })
        );
      } else {
        dispatch(authActions.forgetPasswordSuccess({ data: response.data }));
      }
    } catch (error) {
      dispatch(authActions.forgetPasswordFail({ error }));
      dispatch(authActions.cleanByKey({ key: 'forgetPassword' }));
    } finally {
      payload.finally();
    }
  };

export const changePassword =
  (payload: PayloadProps) => async (dispatch: any) => {
    try {
      payload.start();
      dispatch(authActions.changePasswordStart());

      const response = await calls.callChangePassword(payload.data);

      if (!response.data.success) {
        payload.error();
        dispatch(
          authActions.changePasswordFail({ error: 'Tuvimos problemas' })
        );
      } else {
        dispatch(authActions.changePasswordSuccess({ data: response.data }));
      }
    } catch (error) {
      dispatch(authActions.changePasswordFail({ error }));
      dispatch(authActions.cleanByKey({ key: 'changePassword' }));
    } finally {
      payload.finally();
    }
  };

export const signUp = (payload: PayloadProps) => async (dispatch: any) => {
  payload.start();
  dispatch(authActions.signUpStart());

  try {
    const response = await calls.callSignUp(payload.data);
    if (!response.data?.success) {
      payload.error();
      console.log(response)
      dispatch(authActions.signUpFail({ error: 'Tuvimos problemas' }));
    } else {
      dispatch(authActions.signUpSuccess({ data: response.data }));
    }
  } catch (error) {
    dispatch(authActions.signUpFail({ error }));
    dispatch(authActions.cleanByKey({ key: 'signUp' }));
  } finally {
    payload.finally();
  }
};
