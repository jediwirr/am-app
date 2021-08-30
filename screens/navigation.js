import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MenuScreen from './Menu';
import DiaryScreen from './Diary';
import MarksScreen from './Marks';
import LoadsScreen from './Loads';
import TimetableScreen from './Timetable';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: 'black',
                tabBarInactiveBackgroundColor: 'black',
                tabBarActiveTintColor: 'white'
            }}
        >
            <Tab.Screen
                name="Меню"
                component={MenuScreen}
                options={{
                    tabBarIcon: () => (
                        <Ionicons 
                            name="home-outline"
                            color="white"
                            size={25}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Дневник"
                component={DiaryScreen}
                options={{
                    tabBarIcon: () => (
                        <Ionicons 
                            name="book-outline"
                            color="white"
                            size={25}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Отметки"
                component={MarksScreen}
                options={{
                    tabBarIcon: () => (
                        <Ionicons 
                            name="create-outline"
                            color="white"
                            size={25}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Загрузки"
                component={LoadsScreen}
                options={{
                    tabBarIcon: () => (
                        <Ionicons 
                            name="attach"
                            color="white"
                            size={25}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Расписание"
                component={TimetableScreen}
                options={{
                    tabBarIcon: () => (
                        <Ionicons 
                            name="calendar-outline"
                            color="white"
                            size={25}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

