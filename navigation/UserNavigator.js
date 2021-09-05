import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { MainNavigator } from './MainNavigator';
import AdsScreen from '../screens/Ads';
import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Account';
import LogOutScreen from '../screens/LogOut';
import AuthScreen from '../screens/AuthScreen';


const Stack = createStackNavigator();

export const UserNavigator = () => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);

    return (
        isSignedIn ? (
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#002e2f',
                  },
                headerTintColor: '#fff'
            }}>
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen 
                        name='Меню'
                        component={MainNavigator}
                    />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen 
                        name='Объявления'
                        component={AdsScreen}
                    />
                    <Stack.Screen 
                        name='Настройки'
                        component={SettingsScreen}
                    />
                    <Stack.Screen 
                        name='Профиль'
                        component={AccountScreen}
                    />
                    <Stack.Screen 
                        name='Выход'
                        component={LogOutScreen}
                    />
                </Stack.Group>
            </Stack.Navigator>
        ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen 
                    name='Авторизация'
                    component={AuthScreen}
                />
            </Stack.Navigator>
        )
    )
}