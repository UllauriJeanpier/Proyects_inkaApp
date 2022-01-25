import { useSelector } from 'react-redux';
import { RootState } from '@redux';

export const useTransactionsSelector = () =>
  useSelector((state: RootState) => state.transactions);
