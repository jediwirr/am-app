import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import * as Linking from 'expo-linking';

import { styles } from "../components/Style";

const Lesson = ({navigation}) => {
    const dispatch = useDispatch();
    const lesson = useSelector(state => state.lesson.lesson);
    const d = useSelector(state => state.date.stringDay);
    const m = useSelector(state => state.date.stringMonth);
    const date = useSelector(state => state.date.stringDate);
    const toggleLessonInfo = (lesson) => dispatch({type: 'TOGGLE_LESSON_INFO', lesson});
    const {width} = Dimensions.get('screen');

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: lesson.subject_name });
      }, []);

    const handleLink = (url) => {
        Linking.openURL(url);
    };

    const data = [
        { title: 'Дата', info: `${date} ${m}, ${d}` },
        { title: 'Тема урока', info: lesson.name_lesson },
        { title: 'Домашнее задание', info: lesson.homework },
        { title: 'Оценки', info: lesson.value },
        { title: 'Замечания', info: lesson.comment }
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

    const renderItem = ({item}) => {
        if (item.info) {
            return <Item title={item.title} info={item.info} />
        }
    };

    const Files = () => (
        <View>
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
                    {lesson.numrows_files_lesson != 0 ? `Общие: ${lesson.numrows_files_lesson}` : ''}
                </Text>
                <Text
                    style={
                        {
                            ...styles.lessonInfo, fontStyle: 'italic'
                        }
                    }
                >
                    {lesson.numrows_files_ind != 0 ? `Индивидуальные: ${lesson.numrows_files_ind}` : ''}
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
    );

    return (
        <FlatList
            style={{padding: 10}}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.title}
            ListFooterComponent={
                lesson.numrows_files_ind || lesson.numrows_files_lesson ? <Files /> : ''
            }
        />
    );
};

export default Lesson;