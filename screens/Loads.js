import React, {useEffect, useState} from 'react';
import { Text, ScrollView } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import { styles, theme, theme_text } from '../components/Style';

const LoadsScreen = ({navigation}) => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);

    const dispatch = useDispatch();
    const loadSubject = (payload, name) => dispatch({type: 'LOAD_SUBJECT', payload, name});

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_marks.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                setSubjects(response.marks)
            })
            .catch(error => console.log(error))
    }, [])

    const selectLesson = (id, name) => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_homework.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}&quarter=1&subject_id=${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response =>
                {
                    loadSubject(response.lessons, name)
                    console.log(response.lessons)
                    navigation.navigate('LoadDetails')
                }
            )
    }

    return (
        <ScrollView  style={
            darkTheme
            ? theme.dark
            : theme.light
        }>
            {subjects.map(item =>
                <Text style={
                    {
                        ...darkTheme
                        ? theme_text.dark
                        : theme_text.light,
                        padding: 15,
                        borderWidth: 1,
                        borderColor: 'gray',
                        margin: 5
                    }
                }
                key={item.subject_id}
                onPress={() => selectLesson(item.subject_id, item.subject)}
                >
                    {item.subject}
                </Text>
            )}
        </ScrollView>
    )
}

export default LoadsScreen;