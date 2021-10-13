import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {styles, theme, theme_text} from '../components/Style';

const TimetableScreen = ({navigation}) => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);
    const lesson = useSelector(state => state.lesson.lesson);

    const dispatch = useDispatch();
    const changeLesson = (payload) => dispatch({type: 'CHANGE_LESSON', payload});

    const days = ['ПН', 'ВТ', 'СР', 'ЧТ','ПТ', 'СБ'];
    const [day, setDay] = useState(days[0]);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_schedule.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.schedule)
                setSchedule(response.schedule)
            })
            .catch(error => console.log(error));
    }, [user, lesson]);

    const Header = () => (
        <View style={styles.period_list_container}>
            {days.map(item =>
                <TouchableOpacity
                    key={item}
                    style={{...styles.period, backgroundColor: day === days[days.indexOf(item)] ? '#9E9E9E' : '#c9c9c9'}}
                    onPress={() => setDay(days[days.indexOf(item)])}
                >
                    <Text
                        key={item}
                        style={{textAlign: 'center'}}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const Item = ({number, subject, item}) => (
        <TouchableOpacity
            style={{ ...styles.listItemContainer, flexDirection: 'row' }}
            onPress={() => {
                changeLesson(item);
                navigation.navigate('Редактирование');
            }}
        >
            <Text style={
                {
                    color: darkTheme ? '#fff' : '#000',
                    fontSize: 18,
                    paddingHorizontal: 15,
                    paddingBottom: 15
                }
            }>{number}</Text>
            <Text style={
                {
                    paddingHorizontal: 15,
                    fontSize: 16
                }
            }>
                {subject}
            </Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        if (item.week_day === (days.indexOf(day) + 1).toString()) {
            return (
                <Item
                    number={item.number_lesson}
                    subject={item.subject}
                    item={item}
                />
            );
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header />
            <FlatList
                data={schedule}
                renderItem={renderItem}
                keyExtractor={item => item.number_lesson + item.week_day}
            />
        </SafeAreaView>
    );
};

export default TimetableScreen;