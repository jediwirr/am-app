import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TimetableScreen from "../screens/Timetable";

const Stack = createStackNavigator();
import TimetableDetail from "../screens/TimetableDetail";

export const TimetableNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Расписание'
                component={TimetableScreen}
            />
            <Stack.Screen
                name='ttDetails'
                component={TimetableDetail}
            />
        </Stack.Navigator>
    )
}