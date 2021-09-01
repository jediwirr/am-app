import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { styles, theme, theme_text } from '../components/Style';

const DiaryScreen = () => {
    const darkTheme = useSelector(state => state.darkTheme);

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
                DIARY
            </Text>
        </ScrollView>
    )
}

export default DiaryScreen;