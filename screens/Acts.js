import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector} from "react-redux";
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../components/Style';

const ActsScreen = () => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);
    const [acts, setActs] = useState([]);
    const {height} = Dimensions.get('screen');

    const months = [
        {name: 'Сентябрь', num: '9'},
        {name: 'Октябрь', num: '10'},
        {name: 'Ноябрь', num: '11'},
        {name: 'Декабрь', num: '12'},
        {name: 'Январь', num: '1'},
        {name: 'Февраль', num: '2'},
        {name: 'Март', num: '3'},
        {name: 'Апрель', num: '4'},
        {name: 'Май', num: '5'}
    ];

    const handleLink = (url) => {
        Linking.openURL(url);
    };

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_acts.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => setActs(response.acts))
            .catch(error => console.log(error));
    }, []);

    // https://diary.alma-mater-spb.ru/e-journal/parents/print_user.php?clue=alma64521&month=9&student=82

    const openAct =(month) => {
        handleLink(`https://diary.alma-mater-spb.ru/e-journal/parents/print_user.php?clue=${userData.clue}&month=${month}&student=${user.student_id}`);
        console.log(userData);
    };

    const Header = () => (
        <Text
            style={
                {
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: height / 50
                }
            }
        >
            Квитанции на оплату
        </Text>
    );

    const Item = ({month, date}) => (
        <TouchableOpacity
            style={{...styles.listItemContainer, flexDirection: 'row', justifyContent: 'space-between'}}
            onPress={() => openAct('9')}
        >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{month}</Text>
            <View style={{flexDirection: 'row'}}>
                <Ionicons
                    name='document-outline'
                    size={25}
                />
                <Text>{acts.type === 1 ? `созд. ${date}` : `изм. ${date}`}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {

        return (
            <Item
                month={
                    months.map(m => 
                        m.num === item.month ? m.name : ''
                    )
                }
                date={item.date}
            />
        )
    };

    return (
        <FlatList
        style={{padding: 10}}
            ListHeaderComponent={Header}
            data={acts}
            renderItem={renderItem}
            keyExtractor={item => item.month + item.date}
        />
    );
};

export default ActsScreen;