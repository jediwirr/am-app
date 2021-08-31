import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../components/Style';

const MenuScreen = ({navigation}) => {
    return (
        <View style={styles.list}>
            <TouchableOpacity style={styles.listItemContainer} onPress={() => navigation.navigate('Объявления')}>
                <Ionicons
                    name='mail-outline'
                    size={25}
                />
                <Text style={styles.listItem}>Объявления</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItemContainer} onPress={() => navigation.navigate('Настройки')}>
                <Ionicons
                    name='contrast'
                    size={25}
                />
                <Text style={styles.listItem}>Настройки</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItemContainer} onPress={() => navigation.navigate('Профиль')}>
                <Ionicons
                    name='person-outline'
                    size={25}
                />
                <Text style={styles.listItem}>Профиль</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItemContainer} onPress={() => navigation.navigate('Выход')}>
                <Ionicons
                    name='log-out-outline'
                    size={25}
                />
                <Text style={styles.listItem}>Выход</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuScreen;