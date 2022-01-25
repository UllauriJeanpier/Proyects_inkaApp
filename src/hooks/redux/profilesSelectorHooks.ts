import { useSelector } from 'react-redux';
import { RootState } from '@redux';

export const useProfilesSelector = () =>
  useSelector((state: RootState) => state.profiles);
