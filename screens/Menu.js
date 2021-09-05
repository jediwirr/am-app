import React, { useEffect } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { styles, theme, styles_dark } from '../components/Style';

const MenuScreen = ({navigation}) => {
    const darkTheme = useSelector(state => state.theme.darkTheme);

    return (
        <ScrollView style={ 
            darkTheme 
            ? theme.dark 
            : theme.light
        } contentContainerStyle={styles.list}>
            
            <TouchableOpacity 
                style={styles.listItemContainer} 
                onPress={() => 
                    navigation.navigate('Объявления')
                }>
                <Ionicons
                    name='mail-outline'
                    size={25}
                    color={darkTheme ? '#fff' : '#000'}
                />
                <Text style={
                    darkTheme 
                    ? styles_dark.listItem 
                    : styles.listItem
                }>Объявления</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.listItemContainer} 
                onPress={() => 
                    navigation.navigate('Настройки')
                }>
                <Ionicons
                    name='contrast'
                    size={25}
                    color={darkTheme ? '#fff' : '#000'}
                />
                <Text style={
                    darkTheme 
                    ? styles_dark.listItem 
                    : styles.listItem
                }>Настройки</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.listItemContainer} 
                onPress={() => 
                    navigation.navigate('Профиль')
                }>
                <Ionicons
                    name='person-outline'
                    size={25}
                    color={darkTheme ? '#fff' : '#000'}
                />
                <Text style={
                    darkTheme 
                    ? styles_dark.listItem 
                    : styles.listItem
                }>Профиль</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.listItemContainer} 
                onPress={() => 
                    navigation.navigate('Выход')
                }>
                <Ionicons
                    name='log-out-outline'
                    size={25}
                    color={darkTheme ? '#fff' : '#000'}
                />
                <Text style={
                    darkTheme 
                    ? styles_dark.listItem 
                    : styles.listItem
                }>Выход</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default MenuScreen;