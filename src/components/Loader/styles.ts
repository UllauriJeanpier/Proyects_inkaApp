import styled from 'styled-components/native';

export default styled.ActivityIndicator.attrs(({theme}) => ({
    size: "large",
    color: theme.colors.primary
  }))`
    margin: auto;
`; 