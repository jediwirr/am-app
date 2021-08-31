import React from 'react';
import { Text, View } from 'react-native';

import { styles } from '../components/Style';

const AccountScreen = () => {
    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 21, textAlign: 'center' }}>Ученик</Text>
            <Text style={{ 
                fontSize: 21, 
                textAlign: 'center', 
                marginTop: 30, 
                borderWidth: 1, 
                borderColor: 'gray' 
            }}>
                Имя ученика
            </Text>
        </View>
    )
}

export default AccountScreen;