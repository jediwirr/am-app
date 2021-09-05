import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { styles, theme, theme_text } from '../components/Style';

const DiaryScreen = () => {
    const darkTheme = useSelector(state => state.theme.darkTheme);

    return (
        <ScrollView style={
            darkTheme 
            ? theme.dark 
            : theme.light 
            } contentContainerStyle={styles.adsScreen}>
            <Ionicons 
                name='arrow-back'
                size={25}
                color={darkTheme ? '#fff': '#000'}
            />
            <View style={{ flexDirection: 'column' }}>
                <Text style={ 
                    darkTheme 
                    ? { ...theme_text.dark, fontSize: 20 } 
                    : { ...theme_text.light, fontSize: 20 } 
                }>3 сентября</Text>
                <Text style={ 
                    darkTheme 
                    ? { ...theme_text.dark, fontSize: 20, textAlign: 'center' } 
                    : { ...theme_text.light, fontSize: 20, textAlign: 'center' } 
                }>пятница</Text>
            </View>
            <Ionicons 
                name='arrow-forward'
                size={25}
                color={darkTheme ? '#fff': '#000'}
            />
        </ScrollView>
    )
}

export default DiaryScreen;