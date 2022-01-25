import { useSelector } from 'react-redux';
import { RootState } from '@redux';

export const useBankSelector = () =>
  useSelector((state: RootState) => state.banks);
