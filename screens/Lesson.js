import React from 'react';
import {View, SafeAreaView, Text, FlatList, Dimensions, Platform} from 'react-native';
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

    const data = [
        {title: 'Дата', info: `${date} ${m}, ${d}`},
        {title: 'Тема урока', info: lesson.name_lesson},
        {title: 'Домашнее задание', info: lesson.homework},
        {title: 'Оценки', info: lesson.value},
        {title: 'Замечания', info: lesson.comment}
    ];

    const Item = ({title, info}) => (
        <View>
            <Text style={styles.lessonInfoTitle}>
                {title}
            </Text>
            <Text style={styles.lessonInfo}>
                {info}
            </Text>
        </View>
    );

    const renderItem = ({item}) => (
        <Item title={item.title} info={item.info} />
    );

    return (
        <SafeAreaView>
            <Text
                style={
                    {
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }
                }
            >
                {lesson.subject_name}
            </Text>
            <View style={{padding: 10}}>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.title}
            />

                <Text style={styles.lessonInfoTitle}>
                    Файлы
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={
                            {
                                ...styles.lessonInfo, fontStyle: 'italic'
                            }
                        }
                    >
                        Общие: {lesson.numrows_files_lesson}
                    </Text>
                    <Text
                        style={
                            {
                                ...styles.lessonInfo, fontStyle: 'italic'
                            }
                        }
                    >
                        Индивидуальные: {lesson.numrows_files_ind}
                    </Text>
                </View>

                <View>
                    {lesson.files_lesson.map(item =>
                        <Text
                            style={
                                {
                                    ...styles.lessonInfo, color: 'green'
                                }
                            }
                            key={lesson.lesson_id}
                            onPress={() => handleLink(item.url)}
                        >
                            {item.title}
                        </Text>
                    )}
                </View>

                <View>
                    {lesson.files_ind.map(item =>
                        <Text
                            style={
                                {
                                    ...styles.lessonInfo, color: 'red'
                                }
                            }
                            key={lesson.lesson_id}
                            onPress={() => handleLink(item.url)}
                        >
                            {item.title}
                        </Text>
                    )}
                </View>
            </View>

            <View
                style={
                    Platform.OS === 'ios'
                        ? {marginLeft: width / 2.5, width: width / 6}
                        : {marginLeft: width / 4, width: width / 2}
                }
            >
                <Button
                    style={
                        {
                            marginTop: 35, borderRadius: 50
                        }
                    }
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