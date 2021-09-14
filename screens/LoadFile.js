import React from 'react';
import {SafeAreaView, Text, ScrollView} from 'react-native';
import {useSelector} from "react-redux";

const LoadFile = () => {
    const name = useSelector(state => state.loads.subjectName);
    const lesson = useSelector(state => state.loads.selectedLesson);

    return (
       <SafeAreaView>
           <Text>Д/З</Text>
           <ScrollView>
               <Text style={{fontWeight: 'bold'}}>{lesson.data_lesson}</Text>
               <Text style={{fontWeight: 'bold'}}>{name}</Text>
           </ScrollView>
       </SafeAreaView>
    )
}

export default LoadFile;