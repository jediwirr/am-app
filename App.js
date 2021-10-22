import React, { useEffect, useState, useRef } from 'react';
// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/Store';

import { UserNavigator } from './navigation/UserNavigator';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const dispatch = useDispatch();
  const setMessage = (payload) => dispatch({type: 'SET_MESSAGE', payload});
  const message = useSelector(state => state.note.message);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
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
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Альма-Матер",
        body: 'Проверьте дз на завтра'
      },
      trigger: {
        repeats: true,
        hour: 17,
        minute: 0
      },
    });
  };

  useEffect(() => {
    Notifications.getAllScheduledNotificationsAsync()
    .then(res => {
      console.log(res);
      if (res.length != 0) {
        console.log('already subscribed');
      } else {
        // schedulePushNotification();
        console.log('making a subscription');
      }
    });

    Notifications.cancelAllScheduledNotificationsAsync('851b6a8b-fb1a-4076-982a-b929195b8d06');
  }, []);

  return (
    <UserNavigator />
  );
};

export default function () {
  return (
    <NavigationContainer>
      <Provider store={store}>
          <App />
      </Provider>
      <StatusBar style="light" backgroundColor='#002e2f' />
    </NavigationContainer>
  )
};