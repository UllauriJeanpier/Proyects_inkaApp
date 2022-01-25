import { useSelector } from 'react-redux';
import { RootState } from '@redux';

export const useUserSelector = () =>
  useSelector((state: RootState) => state.user);
