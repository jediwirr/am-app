import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from '../components/Style';
import { useDispatch } from 'react-redux';

const LogOutScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const log_out = () => dispatch({type: 'LOG_OUT'});

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 18}}>Вы уверены, что хотите выйти из профиля?</Text>
            <View style={styles.modalPanel}>
                <Button 
                    color='blue'
                    onPress={log_out}
                >ДА</Button>
                <Button 
                    color='red'
                    onPress={() => navigation.navigate('Меню')}
                >НЕТ</Button>
            </View>
        </View>
    )
}

export default LogOutScreen;