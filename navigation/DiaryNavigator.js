import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DiaryScreen from '../screens/Diary';
import Lesson from '../screens/Lesson';

const Stack = createStackNavigator();

export const DiaryNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{
            tabBarActiveBackgroundColor: '#002e2f',
            tabBarInactiveBackgroundColor: '#002e2f',
            tabBarActiveTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#002e2f',
              },
            headerTintColor: '#fff'
        }}>
            <Stack.Screen
                name='Дневник'
                component={DiaryScreen}
            />
            <Stack.Screen
                name='Lesson'
                component={Lesson}
            />
        </Stack.Navigator>
    );
};