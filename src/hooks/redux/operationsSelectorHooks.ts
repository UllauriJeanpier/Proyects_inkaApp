import { useSelector } from 'react-redux';
import { RootState } from '@redux';

export const useOperationsSelector = () =>
  useSelector((state: RootState) => state.operations);
