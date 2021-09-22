import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { styles, theme } from '../components/Style';

const LogOutScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const log_out = () => dispatch({type: 'LOG_OUT'});
    const darkTheme = useSelector(state => state.theme.darkTheme);

    return (
        <ScrollView  style={ 
            darkTheme 
            ? theme.dark 
            : theme.light
        } contentContainerStyle={styles.container}>

            <Text style={
                darkTheme 
                ? {color: '#fff', fontSize: 18} 
                : {color: '#000', fontSize: 18}
            }>Вы уверены, что хотите выйти из профиля?</Text>

            <View style={styles.modalPanel}>
                <Button 
                    mode={
                        darkTheme 
                        ? 'contained' 
                        : 'text'
                    }
                    color='blue'
                    onPress={log_out}
                >ДА</Button>

                <Button 
                    mode={
                        darkTheme 
                        ? 'contained' 
                        : 'text'
                    }
                    color='red'
                    onPress={
                        () => navigation.navigate('Меню')
                    }
                >НЕТ</Button>
            </View>

        </ScrollView>
    );
};

export default LogOutScreen;