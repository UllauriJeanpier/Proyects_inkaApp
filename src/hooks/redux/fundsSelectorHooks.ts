import { useSelector } from 'react-redux';
import { RootState } from '@redux';

export const useFundSelector = () =>
  useSelector((state: RootState) => state.originFund);
