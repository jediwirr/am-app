import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from "react-redux";

const ActsScreen = () => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);
    const [acts, setActs] = useState([]);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_acts.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => setActs(response.acts))
            .catch(error => console.log(error))
    }, []);

    const Header = () => (
        <Text>Квитанции на оплату</Text>
    )

    const Item = ({month, date}) => (
        <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{month}</Text>
            <Text>{acts.type === 1 ? `созд. ${date}` : `изм. ${date}`}</Text>
        </View>
    );

    const renderItem = ({item}) => {
        return <Item month={item.month} date={item.date} />
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