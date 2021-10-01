import React, {useEffect, useState} from 'react';
import {Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector} from "react-redux";

const ActsScreen = () => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);
    const [acts, setActs] = useState([]);
    const {height} = Dimensions.get('screen');

    const months = [
        {name: 'Сентябрь', num: 9},
        {name: 'Октябрь', num: 10},
        {name: 'Ноябрь', num: 11},
        {name: 'Декабрь', num: 12},
        {name: 'Январь', num: 1},
        {name: 'Февраль', num: 2},
        {name: 'Март', num: 3},
        {name: 'Апрель', num: 4},
        {name: 'Май', num: 5}
    ];

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_acts.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => setActs(response.acts))
            .catch(error => console.log(error));
    }, []);

    const openAct =(month) => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/parents/print_user.php?clue=${userData.clue}&month=${month}&student_id=${user.student_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.log(error))
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
            style={{flexDirection: 'row'}}
            onPress={() => openAct(month)}
        >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{month}</Text>
            <Text>{acts.type === 1 ? `созд. ${date}` : `изм. ${date}`}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        return (
            <Item
                month={
                    item.month === months.num ? months.name : ''
                }
                date={item.date}
            />
        )
    };

    return (
        <FlatList
            ListHeaderComponent={Header}
            data={acts}
            renderItem={renderItem}
            keyExtractor={item => item.month + item.date}
        />
    );
};

export default ActsScreen;