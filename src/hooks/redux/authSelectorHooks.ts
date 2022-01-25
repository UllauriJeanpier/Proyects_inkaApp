import { useSelector } from 'react-redux';
import { RootState } from '@redux';

export const useAuthSelector = () =>
  useSelector((state: RootState) => state.auth);
