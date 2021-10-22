import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from "react-redux";
import * as Linking from 'expo-linking';

import { styles } from "../components/Style";

const Lesson = ({navigation}) => {
    const lesson = useSelector(state => state.lesson.lesson);
    const date = useSelector(state => state.date.stringDate);
    const d = useSelector(state => state.date.stringDay);
    const m = useSelector(state => state.date.stringMonth);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: lesson.subject_name });
      }, []);

    const handleLink = (url) => {
        Linking.openURL(url.replace(' ', '%20'));
    };

    const data = [
        { title: 'Дата', info: `${date} ${m}, ${d}` },
        { title: 'Тема урока', info: lesson.name_lesson },
        { title: 'Домашнее задание', info: lesson.homework },
        { title: 'Оценки', info: lesson.value },
        { title: 'Замечания', info: lesson.comment, type: lesson.comment_type }
    ];

    const Item = ({title, info, type}) => (
        <View>
            <Text style={styles.lessonInfoTitle}>
                {title}
            </Text>
            <Text style={
                {
                    ...styles.lessonInfo, 
                    color: type === 0 
                    ? 'red' 
                    : type === 1 
                    ? 'green' 
                    : '#000'
                }
            }>
                {info}
            </Text>
        </View>
    );

    const renderItem = ({item}) => {
        if (item.info) {
            return (
                <View>
                    <Item title={item.title} info={item.info} type={item.type} />
                </View>
            )
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
                        onPress={
                            () => handleLink(item.url)
                        }
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
                        onPress={
                            () => handleLink(item.url)
                        }
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
                lesson.files.length != 0 ? <Files /> : ''
            }
        />
    );
};

export default Lesson;