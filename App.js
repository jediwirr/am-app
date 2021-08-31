import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/Store';

import { UserNavigator } from './navigation/UserNavigator';

const App = () => {
  return (
      <NavigationContainer>
        <Provider store={store}>
          <UserNavigator />
        </Provider>
      </NavigationContainer>
  );
}

export default App;
