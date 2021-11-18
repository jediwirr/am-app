import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native-paper';
import Home, { Categories, ErrorScreen, UserSettings } from '../screens/gimnazist/Home';
import ArticleDetails from '../screens/gimnazist/ArticleDetails';
import { useSelector } from 'react-redux';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const IoniconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

const myStyles = {
    title: "Гимназист",
    headerTintColor: "gray"
    // headerStyle: {
    //   backgroundColor: "#FCECE4"
    // }
}

export const HomeToDetailsNav = () => {
    const isSignedIn = useSelector(state => state.isSignedIn);
    const username = useSelector(state => state.userName);
    const homeTitle = useSelector(state => state.homeName);
    const error = useSelector(state => state.error);

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen 
                    name="Home" 
                    component={HomeOrCatNav}
                    options={{...myStyles}}
                />
                <Stack.Screen 
                    name="Details" 
                    component={ArticleDetails}
                    options={{...myStyles}}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen 
                    name="UserSettings" 
                    component={UserSettings}
                    options={{
                        ...myStyles,
                        title: username
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export const HomeOrCatNav = () => {
    return(
        <Tab.Navigator screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: 'black',
            }}
        >
            <Tab.Screen 
                name="МАТЕРИАЛЫ" 
                component={Home} 
                options={{
                    tabBarIcon: () => (
                        <Ionicons
                            name="library"
                            size={25}
                            color='#711E63'
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="РУБРИКИ" 
                component={Categories} 
                options={{
                    tabBarIcon: () => (
                        <Ionicons
                            name="apps"
                            size={25}
                            color='#711E63'
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}