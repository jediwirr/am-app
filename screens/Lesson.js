import React, {useEffect, useState} from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";

import { styles } from "../components/Style";

const Lesson = () => {
    const dispatch = useDispatch();
    const toggleLessonInfo = (lesson) => dispatch({type: 'TOGGLE_LESSON_INFO', lesson});

    const lessonTitle = useSelector(state => state.lesson.lessonTitle);


    return (
        <SafeAreaView>
            <Text
                style={
                    {
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }
                }>{lessonTitle}</Text>
            <View style={{paddingTop: 15}}>
                <Text style={styles.lessonInfoTitle}>
                    Дата
                </Text>
                <Text style={styles.lessonInfo}>
                    {lessonDate}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Тема урока
                </Text>
                <Text style={styles.lessonInfo}>
                    {lessonName}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Домашнее задание
                </Text>
                <Text style={styles.lessonInfo}>
                    {homework}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Оценки
                </Text>
                <Text style={styles.lessonInfo}>
                    {marks}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Замечания
                </Text>
                <Text style={styles.lessonInfo}>
                    {comments}
                </Text>
                <Text style={styles.lessonInfoTitle}>
                    Файлы
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.lessonInfo, fontStyle: 'italic'}}>Общие: {lessonFilesAmount}</Text>
                    <Text style={{...styles.lessonInfo, fontStyle: 'italic'}}>Индивидуальные: {indFilesAmount}</Text>
                </View>
            </View>
            <Button
                style={{marginTop: 50}}
                onPress={() => toggleLessonInfo()}
            >
                CLOSE
            </Button>
        </SafeAreaView>
    );
}

export default Lesson;