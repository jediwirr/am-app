import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Modal} from "react-native";

import { styles, theme, theme_text } from '../components/Style';
import {useDispatch, useSelector} from "react-redux";

import LoadFile from "./LoadFile";

const LoadDetails = () => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const subject = useSelector(state => state.loads.subject);
    const name = useSelector(state => state.loads.subjectName);
    const isSelected = useSelector(state => state.loads.isSelected);
    const dispatch = useDispatch();
    const selectLesson = (payload) => dispatch({type: 'SELECT_LESSON', payload});

    return (
        <ScrollView>

            <Modal
                animationType='slide'
                visible={isSelected}
            >
                <LoadFile />
            </Modal>

            <View>
                <Text
                    style={
                        {
                            padding: 10,
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }
                    }
                >
                    {name}
                </Text>
            </View>
            {subject.map(item =>
                <TouchableOpacity
                    key={item.lesson_id}
                    style={
                        {
                            flexDirection: 'row',
                            padding: 10,
                            margin: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray',
                            fontSize: 16
                        }
                    }
                    onPress={() => selectLesson(item)}
                >
                    <Text style={{fontWeight: 'bold'}}>
                        {item.data_lesson}
                    </Text>
                    <View>
                        <Text style={{paddingLeft: 10}}>
                            {item.homework}
                        </Text>
                        <Text
                            style={
                                {
                                    paddingLeft: 10,
                                    paddingTop: 10,
                                    fontStyle: 'italic',
                                    color: item.answer_student.length === 0 ? 'black' : 'red'
                                }
                            }
                        >
                            {
                                item.answer_student.length === 0
                                ? 'Нет загруженных файлов'
                                : `Загруженных файлов - ${item.answer_student.length}`
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </ScrollView>
    )
}

export default LoadDetails;