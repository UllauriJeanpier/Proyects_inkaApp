import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from  "react-native-splash-screen";
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import { lightTheme } from './themes';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './redux';
import linking from './deepLink';

const Root: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <StoreProvider store={store}>
        <ThemeProvider theme={lightTheme}>
          <NavigationContainer linking={linking}>
            <Routes />
          </NavigationContainer>
        </ThemeProvider>
    </StoreProvider>
  );
};

export default Root;
