import React, { useEffect, useState, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { MainNavigator } from './MainNavigator';
import AdsScreen from '../screens/Ads';
import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Account';
import LogOutScreen from '../screens/LogOut';
import AuthScreen from '../screens/AuthScreen';
import ActsScreen from "../screens/Acts";

import { HomeToDetailsNav } from './Navs';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

export const UserNavigator = () => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const dispatch = useDispatch();

    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const navigation = useNavigation();
    const setExpoPushToken = (payload) => dispatch({type: 'SET_TOKEN', payload});

    const sendPushToGym = (pt) => {
        const data = {
            'push_token': pt,
            'owner': ''
        }
    
        fetch('gimnazist.herokuapp.com/api/tokens/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))
    };

    const registerForPushNotificationsAsync = async () => {
        let token;
    
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
          sendPushToGym(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        return token;
    };

    useEffect(() => {
        const lastNotificationResponse = Notifications.getLastNotificationResponseAsync()
        console.log(JSON.stringify(lastNotificationResponse))
        // Linking.getInitialURL().then(url => console.log(url))
    
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        //   console.log(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          // console.log(response.notification.request.content.data);
          const source = response.notification.request.content.data;
        //   console.log(source)
          if (source.url === "gym") {
            // Linking.openURL('exp://127.0.0.1:19000/--/gym');
            navigation.navigate('Гимназист');
          } else {
            navigation.navigate('DiaryNavigator');
          }
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);



    const Nav = () => (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#002e2f',
            },
            headerTintColor: '#fff',
            headerShown: false
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
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='Акты'
                    component={ActsScreen}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='Настройки'
                    component={SettingsScreen}
                />
                <Stack.Screen
                    name='Профиль'
                    component={AccountScreen}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='Выход'
                    component={LogOutScreen}
                />
                <Stack.Screen
                    name='Гимназист'
                    component={HomeToDetailsNav}
                />
            </Stack.Group>
        </Stack.Navigator>
    );

    const NonAuthorized = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Авторизация'
                component={AuthScreen}
            />
            <Stack.Screen
                name='Гимназист'
                component={HomeToDetailsNav}
            />
        </Stack.Navigator>
    );

    return (
        isSignedIn ? (
            <Nav />
        ) : (
            <NonAuthorized />
        )
    )
}