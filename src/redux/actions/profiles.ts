import * as profilesActions from '@redux/slices/profiles';
import * as calls from '@services/api/calls';
import * as storage from '@utils/storage';
import { call } from 'react-native-reanimated';
import { PayloadProps } from './payload';

export const getProfiles = () => async (dispatch: any) => {
  dispatch(profilesActions.getProfilesStart());

  try {
    const response = await calls.callGetProfiles();

    if (response.data.success) {
      dispatch(profilesActions.getProfilesSuccess({ data: response.data }));
    } else {
      dispatch(profilesActions.getProfilesFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(profilesActions.getProfilesFail({ error }));
    dispatch(profilesActions.cleanByKey({ key: 'getProfiles' }));
  }
};

export const setProfile = (payload: any) => async (dispatch: any) => {
  dispatch(profilesActions.setProfileStart());

  try {
    const response = await calls.callSetProfile(payload);

    if (response.data.success) {
      dispatch(profilesActions.setProfileSuccess({ data: response.data }));
      storage.setItem('sesion', response.data.data);
    } else {
      dispatch(profilesActions.setProfileFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(profilesActions.setProfileFail({ error }));
  }
};

export const getActivityEconomic = () => async (dispatch: any) => {
  dispatch(profilesActions.getActivityEconomicStart());

  try {
    const response = await calls.callGetActividadEconomica();

    if (response.data.success) {
      dispatch(
        profilesActions.getActivityEconomicSuccess({ data: response.data })
      );
    } else {
      dispatch(
        profilesActions.getActivityEconomicFail({ error: 'Tuvimos problemas' })
      );
    }
  } catch (error) {
    dispatch(profilesActions.getActivityEconomicFail({ error }));
    dispatch(profilesActions.cleanByKey({ key: 'getActivityEconomic' }));
  }
};

export const getSectorEconomic = () => async (dispatch: any) => {
  dispatch(profilesActions.getSectorEconomicStart());

  try {
    const response = await calls.callGetSectorEconomico();

    if (response.data.success) {
      dispatch(
        profilesActions.getSectorEconomicSuccess({ data: response.data })
      );
    } else {
      dispatch(
        profilesActions.getSectorEconomicFail({ error: 'Tuvimos problemas' })
      );
    }
  } catch (error) {
    dispatch(profilesActions.getSectorEconomicFail({ error }));
    dispatch(profilesActions.cleanByKey({ key: 'getSectorEconomic' }));
  }
};

export const saveProfile = (payload: PayloadProps) => async (dispatch: any) => {
  try {
    payload.start();
    dispatch(profilesActions.saveProfileStart());

    const response = await calls.callSaveProfileCompany(payload.data);
    if (response?.data.success) {
      dispatch(
        profilesActions.saveProfileSuccess({
          data: response.data,
        })
      );
      payload.success();
    } else {
      payload.error();
      dispatch(profilesActions.saveProfileFail({ error: 'Tuvimos problemas' }));
    }
  } catch (error) {
    dispatch(profilesActions.saveProfileFail({ error }));
    dispatch(profilesActions.cleanByKey({ key: 'saveProfile' }));
  } finally {
    payload.finally();
  }
};
