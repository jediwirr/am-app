import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainNavigator } from './screens/navigation';

const App = () => {
  return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
  );
}

export default App;
