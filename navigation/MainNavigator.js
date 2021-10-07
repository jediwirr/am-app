import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MenuScreen from '../screens/Menu';
import MarksScreen from '../screens/Marks';
import { LoadsNavigator } from "./LoadsNavigator";
import { TimetableNavigator } from "./TimetableNavigator";
import { DiaryNavigator } from './DiaryNavigator';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: '#002e2f',
                tabBarInactiveBackgroundColor: '#002e2f',
                tabBarActiveTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#002e2f',
                  },
                headerTintColor: '#fff'
            }}>
            <Tab.Group>
                <Tab.Screen
                    name="Main"
                    component={MenuScreen}
                    options={{
                        tabBarIcon: () => (
                            <Ionicons 
                                name='home-outline'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Меню'
                    }}
                />
                <Tab.Screen
                    name="DiaryNavigator"
                    component={DiaryNavigator}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => (
                            <Ionicons 
                                name='book-outline'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Дневник'
                    }}
                />
                <Tab.Screen
                    name="Отметки"
                    component={MarksScreen}
                    options={{
                        tabBarIcon: () => (
                            <Ionicons 
                                name='create-outline'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Отметки'
                    }}
                />
                <Tab.Screen
                    name="LoadsNavigator"
                    component={LoadsNavigator}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => (
                            <Ionicons 
                                name='attach'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Загрузка'
                    }}
                />
                <Tab.Screen
                    name="TimetableNavigator"
                    component={TimetableNavigator}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => (
                            <Ionicons 
                                name='calendar-outline'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Расписание'
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
};
