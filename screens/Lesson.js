import React from 'react';
import {View, SafeAreaView, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import * as Linking from 'expo-linking';

import {styles} from "../components/Style";

const Lesson = () => {
    const dispatch = useDispatch();
    const lesson = useSelector(state => state.lesson.lesson);
    const d = useSelector(state => state.date.stringDay);
    const m = useSelector(state => state.date.stringMonth);
    const date = useSelector(state => state.date.stringDate);
    const toggleLessonInfo = (lesson) => dispatch({type: 'TOGGLE_LESSON_INFO', lesson});
    const {width} = Dimensions.get('screen');

    const handleLink = (url) => {
        Linking.openURL(url);
    };


    return (
        <SafeAreaView>
            <Text
                style={
                    {
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }
                }>{lesson.subject_name}</Text>
            <View style={{padding: 10}}>
                <Text style={styles.lessonInfoTitle}>
                    Дата
                </Text>
                <Text style={styles.lessonInfo}>
                    {`${date} ${m}, ${d}`}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Тема урока
                </Text>
                <Text style={styles.lessonInfo}>
                    {lesson.name_lesson}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Домашнее задание
                </Text>
                <Text style={styles.lessonInfo}>
                    {lesson.homework}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Оценки
                </Text>
                <Text style={styles.lessonInfo}>
                    {lesson.value}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Замечания
                </Text>
                <Text style={styles.lessonInfo}>
                    {lesson.comment}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Файлы
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.lessonInfo, fontStyle: 'italic'}}>Общие: {lesson.numrows_files_lesson}</Text>
                    <Text style={{...styles.lessonInfo, fontStyle: 'italic'}}>Индивидуальные: {lesson.numrows_files_ind}</Text>
                </View>
                <View>
                    {lesson.files_lesson.map(item =>
                        <Text
                            style={{...styles.lessonInfo, color: 'green'}}
                            key={lesson.lesson_id}
                            onPress={() => handleLink(item.url)}
                        >{item.title}</Text>
                    )}
                </View>
                <View>
                    {lesson.files_ind.map(item =>
                        <Text
                            style={{...styles.lessonInfo, color: 'red'}}
                            key={lesson.lesson_id}
                            onPress={() => handleLink(item.url)}
                        >{item.title}</Text>
                    )}
                </View>
            </View>

            <View style={{marginLeft: width / 2.5, width: width / 6}}>
                <Button style={{marginTop: 35, borderRadius: 50}}
                        mode='contained'
                        onPress={() => toggleLessonInfo({})}
                >
                    Закрыть
                </Button>
            </View>

        </SafeAreaView>
    );
};

export default Lesson;