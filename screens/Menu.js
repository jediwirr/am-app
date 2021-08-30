import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../components/Style';

const MenuScreen = () => {
    return (
        <View style={styles.list}>
            <View style={styles.listItemContainer}>
                <Ionicons
                    name='mail-outline'
                    size={25}
                />
                <Text style={styles.listItem}>Объявления</Text>
            </View>
            <View style={styles.listItemContainer}>
                <Ionicons
                    name='contrast'
                    size={25}
                />
                <Text style={styles.listItem}>Настройки</Text>
            </View>
            <View style={styles.listItemContainer}>
                <Ionicons
                    name='person-outline'
                    size={25}
                />
                <Text style={styles.listItem}>Профиль</Text>
            </View>
            <View style={styles.listItemContainer}>
                <Ionicons
                    name='log-out-outline'
                    size={25}
                />
                <Text style={styles.listItem}>Выход</Text>
            </View>
        </View>
    )
}

export default MenuScreen;