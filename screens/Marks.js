import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { styles, theme, styles_dark } from '../components/Style';

const MarksScreen = () => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const userData = useSelector(state => state.auth.userData);
    const user = useSelector(state => state.auth.user);
    const periods = ['1', '2', 'I', '3', '4', 'II'];
    const dispatch = useDispatch();
    const loadMarks = (payload) => dispatch({type: 'LOAD_MARKS', payload});
    // const marks = useSelector(state => state.marks.marks);

    const [subjects, setSubjects] = useState('');

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_marks.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            // loadMarks(response.marks)
            setSubjects(response.marks)
        })
        .catch(error => console.log(error))
    }, [])

    const Item = ({ title, marks }) => (
        <View style={{ ...styles.listItemContainer, flexDirection: 'column' }}>
            <Text style={{ 
                color: darkTheme ? '#fff' : '#000', 
                fontSize: 18, 
                paddingHorizontal: 15, 
                fontWeight: 'bold' 
            }}>{title}</Text>
            <Text style={darkTheme ? styles_dark.listItem : styles.listItem}>
                {marks}
            </Text>
        </View>
    )

    const renderItem = ({ item }) => (
        <Item 
            title={item.subject} 
            marks={
                item.stringMarks.map(item => item)
            } 
        />
    )

    return (
        <SafeAreaView>
            <View style={styles.period_list_container}>
                {periods.map(period =>
                    <TouchableOpacity 
                        key={period}
                        style={styles.period}
                        onPress={() => 
                            console.log('touch')
                        }>
                        <Text 
                        key={period}
                        style={{textAlign: 'center'}}>
                            {period}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <SafeAreaView style={ 
                darkTheme 
                ? theme.dark 
                : theme.light
            }>
                <FlatList 
                    data={subjects}
                    renderItem={renderItem}
                    keyExtractor={item => item.subject_id}
                />
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default MarksScreen;