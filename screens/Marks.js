import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import { styles, theme, styles_dark } from '../components/Style';

const MarksScreen = () => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const userData = useSelector(state => state.auth.userData);
    const user = useSelector(state => state.auth.user);
    const periods = ['1', '2', 'I', '3', '4', 'II'];

    const [subjects, setSubjects] = useState('');

    // SET IT AUTAMOTICALLY!!!
    const [term, setTerm] = useState('1');

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_marks.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            setSubjects(response.marks);
            console.log(response);
        })
        .catch(error => console.log(error));
    }, [user]);

    const Item = ({ title, marks, final }) => (
        <View 
            style={
                {
                    ...styles.listItemContainer, 
                    flexDirection: 'column', 
                    paddingRight: 15 
                }
            }
            >
            <Text
                style={
                    {
                        color: darkTheme ? '#fff' : '#000',
                        fontSize: 18,
                        paddingHorizontal: 15,
                        paddingBottom: 15,
                        fontWeight: 'bold'
                    }
                }
            >
                {title}
            </Text>
            <View 
                style={
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }
                }
            >
            <Text
                style={
                    {
                        color: '#0080ff',
                        paddingHorizontal: 15,
                        fontSize: 16
                    }
                }
            >
                {marks}
            </Text>
            <Text 
                style={
                    {
                        fontSize: 16, 
                        color: final === '5' 
                        ? '#008040' 
                        : final === '4' 
                        ? '#e1e100' 
                        : '#000'
                    }
                }
                >
                {final}
            </Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item
            title={item.subject}
            marks={
                term === '1'
                ? item.stringMarks[0]
                : term === '2'
                ? item.stringMarks[1]
                : term === '3'
                ? item.stringMarks[2]
                : term === '4'
                ? item.stringMarks[3]
                : term === 'I'
                ? item.stringMarks[4]
                : term === 'II'
                ? item.stringMarks[5]
                : item.stringMarks[0]
            }
            final={
                item.itogoMarks[0] != 0 && term === '1'
                ? item.itogoMarks[0]
                : item.averageMarks[1] != 0 && term === '2'
                ? item.itogoMarks[1]
                : item.averageMarks[2] != 0 && term === 'I'
                ? item.itogoMarks[2]
                : item.averageMarks[3] != 0 && term === '3'
                ? item.itogoMarks[3]
                : item.averageMarks[4] != 0 && term === '4'
                ? item.itogoMarks[4]
                : item.averageMarks[5] != 0 && term === 'II'
                ? item.itogoMarks[5]
                : ''
            }
        />
    );

    const Header = () => (
        <View style={styles.period_list_container}>
            {periods.map(period =>
                <TouchableOpacity
                    key={period}
                    style={
                        {
                            ...styles.period, 
                            backgroundColor: term === period 
                            ? '#9E9E9E' 
                            : '#c9c9c9'
                        }
                    }
                    onPress={() =>
                        setTerm(period)
                    }>
                    <Text
                        key={period}
                        style={{textAlign: 'center'}}
                    >
                        {period}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView
            style={styles.safeArea}
        >
                <Header />
                <FlatList
                    data={subjects}
                    renderItem={renderItem}
                    keyExtractor={item => item.subject_id}
                    ListFooterComponent={
                        <Text style={{paddingVertical: 25}}></Text>
                    }
                />
            </SafeAreaView>
    );
};

export default MarksScreen;