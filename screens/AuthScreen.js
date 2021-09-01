import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View, Image, TextInput, SafeAreaView } from 'react-native';
import {  Button } from 'react-native-paper';

import { styles } from '../components/Style';

const AuthScreen = () => {
    const dispatch = useDispatch();
    const log_in = () => dispatch({type: 'LOG_IN'});
    const [login, onChangeLogin] = useState('');
    const [password, onChangePassword] = useState('');

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: '#00656d' }}>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <Text style={styles.logoText}>Гимназия «Альма Матер»</Text>
                <Image 
                    style={styles.logo}
                    source={require('../assets/gimnazist.png')}
                />
            </View>
            <Text style={styles.greeting}>Добро пожаловать!</Text>
            <View>
                <TextInput 
                    style={styles.input} 
                    onChangeText={login => onChangeLogin(login)}
                    value={login}
                    placeholder='Введите логин'
                />
                <TextInput 
                    style={styles.input} 
                    onChangeText={password => onChangePassword(password)}
                    value={password}
                    placeholder='Введите пароль'
                    secureTextEntry={true}
                />
            </View>
            <Button
                onPress={log_in}
                color='#fff'
                uppercase={false}
                style={{ padding: 10 }}
                labelStyle={{ fontSize: 25 }}
            >
                Вход
            </Button>
        </SafeAreaView>
    )
}

export default AuthScreen;