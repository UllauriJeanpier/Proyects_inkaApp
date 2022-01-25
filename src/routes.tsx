import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntdIcon from 'react-native-vector-icons/AntDesign';

import WelcomeScreen from '@pages/WelcomeScreen';
import LoginScreen from '@pages/LoginScreen';
import SignupScreen from '@pages/SignupScreen';
import RecoverPasswordScreen from '@pages/RecoverPasswordScreen';
import ChangePasswordScreen from '@pages/ChangePasswordScreen';
import ChangeScreen from '@pages/ChangeScreen';
import AccountsScreen from '@pages/AccountsScreen';
import AccountFormScreen from '@pages/AccountFormScreen';
import HistoryScreen from '@pages/HistoryScreen';
import HistoryDetailScreen from '@pages/HistoryDetailScreen';
import ProfileScreen from '@pages/ProfileScreen';
import OperationDetailScreen from '@pages/OperationDetailScreen';
import ProfilesScreen from '@pages/ProfilesScreen';
import ProfilesFormScreen from '@pages/ProfilesFormScreen';
import ShareHolderScreen from '@pages/ShareHolderScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  ShareHolderScreen: undefined | {
    payload: any
  }
  RecoverPasswordScreen: undefined;
  ChangePasswordScreen: { token: string; mail: string };
  ChangeScreen: undefined;
  AccountsScreen: undefined;
  AccountFormScreen: { edit?: boolean };
  HistoryScreen: undefined;
  HistoryDetailScreen: { number: string | number; id: string | number };
  ProfileScreen: undefined;
  OperationDetailScreen: { id: string | number };
  ChangeStack: undefined;
  AccountsStack: undefined;
  HistoryStack: undefined;
  ProfilesScreen: undefined;
  ProfilesFormScreen: undefined;
};

const _ChangeScreen: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="ChangeScreen"
  >
    <Stack.Screen name="ChangeScreen" component={ChangeScreen} />
    <Stack.Screen name="AccountFormScreen" component={AccountFormScreen} />
    <Stack.Screen
      name="OperationDetailScreen"
      component={OperationDetailScreen}
    />
  </Stack.Navigator>
);

const _AccountScreen: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="AccountsScreen"
  >
    <Stack.Screen name="AccountsScreen" component={AccountsScreen} />
    <Stack.Screen name="AccountFormScreen" component={AccountFormScreen} />
  </Stack.Navigator>
);

const _HistoryScreen: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="HistoryScreen"
  >
    <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
    <Stack.Screen name="HistoryDetailScreen" component={HistoryDetailScreen} />
    <Stack.Screen
      name="OperationDetailScreen"
      component={OperationDetailScreen}
    />
  </Stack.Navigator>
);

const _ProfileScreen: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="ProfileScreen"
  >
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);

const _ProfilesScreen: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="ProfilesScreen"
  >
    <Stack.Screen name="ProfilesScreen" component={ProfilesScreen} />
    <Stack.Screen name="ProfilesFormScreen" component={ProfilesFormScreen} />
  </Stack.Navigator>
);

const HomeScreen: React.FC = () => (
  <Tab.Navigator
    initialRouteName="ChangeScreen"
    tabBarOptions={{
      activeTintColor: '#36798C',
      inactiveTintColor: '#848484',
      activeBackgroundColor: '#FFFFFF',
      inactiveBackgroundColor: '#FFFFFF',
      labelStyle: {
        fontFamily: 'Nunito-Bold',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 16,
        padding: 0,
        margin: 0,
        paddingBottom: 12,
      },
      style: {
        backgroundColor: '#FFFFFF',
        height: 80,
        paddingTop: 12,
      },
      tabStyle: {
        backgroundColor: '#FFFFFF',
      },
    }}
  >
    <Tab.Screen
      name="ChangeStack"
      component={_ChangeScreen}
      options={{
        tabBarLabel: 'Nueva Ope.',
        tabBarIcon: ({ color, size }) => (
          <AntdIcon name="sync" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="AccountsStack"
      component={_AccountScreen}
      options={{
        tabBarLabel: 'Cuentas Ban.',
        tabBarIcon: ({ color, size }) => (
          <AntdIcon name="creditcard" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="HistoryStack"
      component={_HistoryScreen}
      options={{
        tabBarLabel: 'Historial',
        tabBarIcon: ({ color, size }) => (
          <AntdIcon name="folder1" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfilesScreen"
      component={_ProfilesScreen}
      options={{
        tabBarLabel: 'Cambiar Perfil',
        tabBarIcon: ({ color, size }) => (
          <AntdIcon name="addusergroup" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileScreen"
      component={_ProfileScreen}
      options={{
        tabBarLabel: 'Mi Perfil',
        tabBarIcon: ({ color, size }) => (
          <AntdIcon name="user" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Routes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="WelcomeScreen"
  >
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="ProfilesScreen" component={ProfilesScreen} />
    <Stack.Screen name="ProfilesFormScreen" component={ProfilesFormScreen} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
    <Stack.Screen name="ShareHolderScreen" component={ShareHolderScreen} />
    <Stack.Screen
      name="RecoverPasswordScreen"
      component={RecoverPasswordScreen}
    />
    <Stack.Screen
      name="ChangePasswordScreen"
      component={ChangePasswordScreen}
    />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
);

export default Routes;
