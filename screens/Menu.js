import React from 'react';
import {Text, FlatList, TouchableOpacity, View, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSelector} from 'react-redux';

import {styles, theme, styles_dark} from '../components/Style';
import Links from "../components/Links";

const MenuScreen = ({navigation}) => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const userType = useSelector(state => state.auth.userType);
    const {height} = Dimensions.get('screen');

    const menu = [
        {name: 'Объявления', icon: 'mail-outline', type: [1, 2]},
        {name: 'Акты', icon: 'print-outline', type: [2]},
        // {name: 'Настройки', icon: 'contrast', type: [1, 2]},
        {name: 'Профиль', icon: 'person-outline', type: [1, 2]},
        {name: 'Выход', icon: 'log-out-outline', type: [1, 2]}
    ];

    const Item = ({name, icon}) => (
        <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() =>
                navigation.navigate({name})
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
        <View>
            <FlatList
                style={styles.list}
                data={menu}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
            <View
                style={{marginTop: height / 2.5}}
            >
                <Links col='#000' />
            </View>
        </View>
    );
};

export default MenuScreen;