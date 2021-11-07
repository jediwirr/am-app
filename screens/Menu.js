import React from 'react';
import {Text, FlatList, TouchableOpacity, View, Dimensions, SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';

import {styles, theme, styles_dark} from '../components/Style';
import Links from "../components/Links";



const MenuScreen = ({navigation}) => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const userType = useSelector(state => state.auth.userType);
    const {height} = Dimensions.get('screen');

    const dispatch = useDispatch();
    const pushToken = useSelector(state => state.note.expoPushToken);
    const setMessage = (payload) => dispatch({type: 'SET_MESSAGE', payload});

    const menu = [
        {name: 'Объявления', icon: 'mail-outline', type: [1, 2, 'admin']},
        {name: 'Акты', icon: 'print-outline', type: [2, 'admin']},
        // {name: 'Настройки', icon: 'contrast', type: [1, 2]},
        {name: 'Профиль', icon: 'person-outline', type: [1, 2, 'admin']},
        {name: 'Выход', icon: 'log-out-outline', type: [1, 2, 'admin']},
        {name: 'Send push', icon: 'arrow-forward-circle-outline', type: ['admin']}
    ];

    async function sendPushNotification(expoPushToken) {
        const message = {
          to: expoPushToken,
          sound: 'default',
          title: 'Original Title',
          body: 'And here is the body!',
          data: { someData: 'goes here' },
        };
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
    }

    const Item = ({name, icon}) => (
        <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() =>
                name === 'Send push' ? sendPushNotification(pushToken) : navigation.navigate({name})
            }>
            <Ionicons
                name={icon}
                size={25}
                color={darkTheme ? '#fff' : '#000'}
            />
            <Text style={
                darkTheme
                    ? styles_dark.listItem
                    : styles.listItem
            }>{name}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        if (item.type.includes(userType)) {
            return <Item name={item.name} icon={item.icon} />
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                style={styles.list}
                data={menu}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
            <View
                // style={{marginTop: height / 2.5}}
            >
                <Links col='#000' navigation={navigation} />
            </View>
        </SafeAreaView>
    );
};

export default MenuScreen;