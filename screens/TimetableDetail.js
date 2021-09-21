import React, {useState} from 'react';
import {View, TextInput, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector} from "react-redux";

import {styles} from "../components/Style";

const TimetableDetail = () => {
    const lesson = useSelector(state => state.tt.lesson);
    const {width, height} = Dimensions.get('screen');
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState(lesson.subject);

    return (
      <View style={styles.container}>
          <TextInput
            style={
                {
                    padding: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    width: width / 1.3
                }
            }
            value={text}
            onChangeText={text => setText(text)}
          />
          <Button style={{marginTop: 35}}
            color='black'
            onPress={() => console.log('uefi')}
          >
              Сохранить
          </Button>
      </View>
    );
};

export default TimetableDetail;