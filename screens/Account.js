import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { styles, theme } from '../components/Style';

const AccountScreen = () => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const user = useSelector(state => state.auth.user);
    const userType = useSelector(state => state.auth.userType);

    return (
        <ScrollView style={ 
            darkTheme 
            ? theme.dark 
            : theme.light
        }>
            <Text style={ 
                darkTheme 
                ? {...styles.account_role, color: '#fff'} 
                : {...styles.account_role, color: '#000'} 
            }>{
                userType === 1 ? 'Ученик' : 'Родитель'
            }</Text>
            <Text style={ 
                darkTheme 
                ? {...styles.account_name, color: '#fff'} 
                : {...styles.account_name, color: '#000'} 
            }>{user.name} {user.surname}</Text>
        </ScrollView>
    )
}

export default AccountScreen;