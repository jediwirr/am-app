import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { 
    TextInput, 
    Text, 
    View, 
    Image,   
    Alert,
    SafeAreaView
} from 'react-native';
import {  Button } from 'react-native-paper';

import { styles } from '../components/Style';

const AuthScreen = () => {
    const dispatch = useDispatch();
    const log_in = (user, user_type, user_data) => dispatch({type: 'LOG_IN', user, user_type, user_data});
    const [login, onChangeLogin] = useState('');
    const [password, onChangePassword] = useState('');

    const sendCredentials = () => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/check_login.php?username=${login}&password=${password}&token=alma831`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            
            let obj = {
                'clue': response.clue,
                'user_id': response.user_id
            }

            response.status === 0
            ? response.student.map(item => log_in(item, response.type, obj))
            : login === '' || password === ''
            ? Alert.alert('Введите логин и пароль')
            : Alert.alert('Вы ввели неверный логин или пароль')

            console.log(response)
        })
        .catch(error => console.log(error))
    }

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
                    autoCapitalize='none'
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
                onPress={sendCredentials}
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