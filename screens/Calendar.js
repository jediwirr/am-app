import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Button} from 'react-native-paper';

import { styles, theme, theme_text } from '../components/Style';
import { days } from '../components/Date';

const Calendar = () => {
    const month = useSelector(state => state.date.stringMonth);
    // const isCalendar = useSelector(state => state.calendar.openCalendar);
    const date = useSelector(state => state.date.stringDate);
    // const calendarDays = useSelector(state => state.calendar.calendarDays);
    const dispatch = useDispatch();
    const toggleCalendar = () => dispatch({type: 'TOGGLE_CALENDAR'});
    const addDays = (payload) => dispatch({type: 'ADD_DAYS'});

    const calendarDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

    // const sortDays = () => {
    //     const newDays = []
    //     for (let i = 1; i < 7; i++) {
    //         newDays.push(days[i])
    //     }
    //     newDays.push(days[0])
    //
    //     return calendarDays.concat(newDays);
    // }

    const renderDays = () => {
        const renderedDays = [];

        for (let i=1; i<7; i++) {
            renderedDays.push(i + '\n')
        }

        return renderedDays;
    }

    return (
        <SafeAreaView style={{...styles.container}}>
            <Text style={{fontSize: 30}}>{month.replace('ря', 'рь')}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 20 }}>
                {calendarDays.map(day =>
                    <Text key={day} style={{
                        padding: 15,
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: 'gray' }}
                    >
                        {day}
                    </Text>
                )}
            </View>

            <Button
                style={{padding: 25}}
                onPress={() => toggleCalendar()}
            >
                CLOSE
            </Button>
        </SafeAreaView>
        );
};

export default Calendar;