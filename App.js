import React, { useEffect } from 'react';
// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

import { UserNavigator } from './navigation/UserNavigator';

const App = () => {
  // const setMessage = (payload) => dispatch({type: 'SET_MESSAGE', payload});
  // const message = useSelector(state => state.note.message);

  return (
    <UserNavigator />
  );
};

export default function () {

  const prefix = Linking.createURL('/');

  const config = {
    screens: {
      Гимназист: 'gym',
    },
  };
  
  const linking = {
    prefixes: [prefix],
    config,
  };
  

  return (
    <NavigationContainer linking={linking}>
      <Provider store={store}>
          <App />
      </Provider>
      <StatusBar style={Platform.OS === 'android' ? 'light' : 'dark'} backgroundColor='#002e2f' />
    </NavigationContainer>
  )
};