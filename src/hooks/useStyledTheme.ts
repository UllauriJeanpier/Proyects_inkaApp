import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

export default function useStyledTheme() {
  const theme = useContext(ThemeContext);
  return theme || {};
}
