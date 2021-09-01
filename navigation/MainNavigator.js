import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import MenuScreen from '../screens/Menu';
import DiaryScreen from '../screens/Diary';
import MarksScreen from '../screens/Marks';
import LoadsScreen from '../screens/Loads';
import TimetableScreen from '../screens/Timetable';


const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
    const darkTheme = useSelector(state => state.darkTheme);

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
                    name="Дневник"
                    component={DiaryScreen}
                    options={{
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
                    name="Загрузка"
                    component={LoadsScreen}
                    options={{
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
                    name="Расписание"
                    component={TimetableScreen}
                    options={{
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
    )
}
