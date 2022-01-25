import { useSelector } from 'react-redux';
import { RootState } from '@redux';

export const useAccountsSelectorHooks = () =>
  useSelector((state: RootState) => state.accounts);
