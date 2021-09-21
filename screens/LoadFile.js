import React from 'react';
import {SafeAreaView, Text, View, Alert} from 'react-native';
import {Button} from 'react-native-paper'
import {useDispatch, useSelector} from "react-redux";
import * as Linking from 'expo-linking';
import {Ionicons} from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

import {styles} from "../components/Style";


const LoadFile = () => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);

    const dispatch = useDispatch();
    const selectLesson = (payload) => dispatch({type: 'SELECT_LESSON', payload});
    const setFiles = (files) => dispatch({type: 'SET_FILES', files});

    const name = useSelector(state => state.loads.subjectName);
    const lesson = useSelector(state => state.loads.selectedLesson);
    const files = useSelector(state => state.loads.files);

    const handleLink = (url) => {
        Linking.openURL(url);
    }

    const refreshLesson = async () => {
        await fetch(`https://diary.alma-mater-spb.ru/e-journal/api/update_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}&lesson_id=${lesson.lesson_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                response.lessons.map(item =>
                        setFiles(item.answer_student)
                )
            })
            .catch(error => console.log(error))
    }

    const pickFiles = async () => {

        try {
            const res = await DocumentPicker.getDocumentAsync();

            const data = new FormData();
            data.append('file', res);

            const uploadFile = async () => {

                await fetch(`https://diary.alma-mater-spb.ru/e-journal/api/upload_file.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}&lesson_id=${lesson.lesson_id}`, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-Type': 'form/multipart'
                    }
                })
                    .then(response => response.json())
                    .then(response => {
                        if (response.status === 0) {

                            Alert.alert('Файлы успешно загружены');

                            refreshLesson();

                        } else if (response.status === 2) {
                            Alert.alert('Чего-то не хватает');
                        } else {
                            Alert.alert('Произошла ошибка, попробуйте ещё раз');
                        }
                    })
            }

            if (res.type === 'cancel') {
                Alert.alert('Загрузка отменена')
            } else {
                await uploadFile();
            }

        } catch (error) {
                throw error
        }
    }

    const deleteFile = async (fileID) => {
        await fetch(`https://diary.alma-mater-spb.ru/e-journal/api/delete_file.php?clue=${userData.clue}&user_id=${userData.user_id}&file_id=${fileID}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => refreshLesson())
    }

    const RenderLesson = () => (
        lesson.answer_student.map(item =>
            <View key={item.file_id} style={{flexDirection: 'row'}}>
                <Text
                    style={
                        {
                            color: '#0033FF',
                            fontSize: 16,
                            paddingVertical: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray'
                        }
                    }
                    onPress={() => handleLink(item.url)}
                >
                    {item.title}
                </Text>
                <Button
                    onPress={() => deleteFile(item.file_id)}
                >
                    <Ionicons
                        name='close-outline'
                        size={25}
                        color='red'
                    />
                </Button>
            </View>
        )
    )

    const RenderFiles = () => (
        files.map(item =>
            <View key={item.file_id} style={{flexDirection: 'row'}}>
                <Text
                    style={
                        {
                            color: '#0033FF',
                            fontSize: 16,
                            paddingVertical: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray'
                        }
                    }
                    onPress={() => handleLink(item.url)}
                >
                    {item.title}
                </Text>
                <Button
                    onPress={() => deleteFile(item.file_id)}
                >
                    <Ionicons
                        name='close-outline'
                        size={25}
                        color='red'
                    />
                </Button>
            </View>
        )
    )

    return (
       <SafeAreaView>
           <Text style={styles.detailsHeader}>Д/З</Text>
            <View style={{padding: 10}}>
                <View style={
                    {
                        flexDirection: 'row'
                    }
                }>
                    <Text style={
                        {
                            fontSize: 16,
                            fontWeight: 'bold',
                            paddingRight: 10
                        }
                    }>{lesson.data_lesson}</Text>
                    <Text style={
                        {
                            fontSize: 16,
                            fontWeight: 'bold'
                        }
                    }>{name}</Text>
                </View>
                <Text
                    style={
                        {
                            fontSize: 18,
                            paddingVertical: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray'
                        }
                    }
                    onPress={() => pickFiles()}
                >
                    + Добавить файл
                </Text>
                <RenderLesson />
            </View>
           <Button
               onPress={() => selectLesson({})}
           >
               CLOSE
           </Button>
       </SafeAreaView>
    )
}

export default LoadFile;