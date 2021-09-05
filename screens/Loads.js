import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { styles, theme, theme_text } from '../components/Style';

const LoadsScreen = () => {
    const darkTheme = useSelector(state => state.theme.darkTheme);

    return (
        <ScrollView  style={ 
            darkTheme 
            ? theme.dark 
            : theme.light
        } contentContainerStyle={styles.container}>
            <Text style={ 
                darkTheme 
                ? theme_text.dark 
                : theme_text.light
            }>
                LOADS
            </Text>
        </ScrollView>
    )
}

export default LoadsScreen;