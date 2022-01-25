import { useSelector } from 'react-redux';
import { RootState } from '@redux';

export const useTypeDocsSelector = () =>
  useSelector((state: RootState) => state.typeDocs);
