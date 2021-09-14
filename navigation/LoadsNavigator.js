import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoadsScreen from '../screens/Loads';
import LoadDetails from "../screens/LoadDetails";

const Stack = createStackNavigator();

export const LoadsNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Загрузка'
                component={LoadsScreen}
            />
            <Stack.Screen
                name='LoadDetails'
                component={LoadDetails}
            />
        </Stack.Navigator>
    )
}