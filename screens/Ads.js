import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { styles, theme, theme_text } from '../components/Style';

const AdsScreen = () => {
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
            <Text style={ 
                darkTheme 
                ? { ...theme_text.dark, fontSize: 20 } 
                : { ...theme_text.light, fontSize: 20 } 
            }>30 авугста - 04 сентября</Text>
            <Ionicons 
                name='arrow-forward'
                size={25}
                color={darkTheme ? '#fff': '#000'}
            />
        </ScrollView>
    )
}

export default AdsScreen;