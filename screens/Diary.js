import React, {useEffect, useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { styles, theme, theme_text } from '../components/Style';
import { days, months } from "../components/Date";

const DiaryScreen = () => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const full_date = new Date(Date());
    const year = full_date.getFullYear();
    const month = full_date.getMonth();
    const day = full_date.getDay();
    const [date, setDate] = useState(full_date.getDate());
    const [d, set_d] = useState('');
    const [m, set_m] = useState('');

    const get_month = () => {
        for (let i=0; i<12; i++) {
            if (month === i) {
                set_m(months[i]);
            }
        }

        return m;
    }

    const get_day = () => {
        for (let i=0; i<7; i++) {
            if (day === i) {
                set_d(days[i]);
            }
        }

        return d;
    }

    useEffect(() => {
        get_day();
        get_month();
    }, [])

    const getNextMonth = () => {
        let i=months.indexOf(m);
        setDate(1);
        m === months[11] ? set_m(months[0]) : set_m(months[i + 1]);
    }

    const getPrevMonth = () => {
        let i=months.indexOf(m);

        if (
            m === months[4]
            || m === months[6]
            || m === months[9]
            || m === months[11]
        ) {
            setDate(30);
        } else if (m === months[2]) {
            setDate(year % 4 === 0 ? 29 : 28);
        } else {
            setDate(31);
        }

        m === months[0] ? set_m(months[11]) : set_m(months[i - 1]);
    }

    const getNextDate = () => {
        if (
            m === months[0]
            || m === months[2]
            || m === months[4]
            || m === months[6]
            || m === months[7]
            || m === months[9]
            || m === months[11]
        )
        {
            date === 31 ? getNextMonth() : setDate(date + 1)
        } else if (m === months[1]) {
            date === 28 || date === 29 ? getNextMonth() : setDate(date + 1)
        } else {
            date === 30 ? getNextMonth() : setDate(date + 1)
        }

        d === days[6] ? set_d(days[0]) : set_d(days[days.indexOf(d) + 1]);
    }

    const getPrevDate = () => {
        date === 1 ? getPrevMonth() : setDate(date - 1);
        d === days[0] ? set_d(days[6]) : set_d(days[days.indexOf(d) - 1]);
    }

    return (
        <ScrollView style={
            darkTheme 
            ? theme.dark 
            : theme.light 
            } contentContainerStyle={styles.adsScreen}>
            <Button
                onPress={() => getPrevDate()}
            >
                <Ionicons
                    name='arrow-back'
                    size={25}
                    color={darkTheme ? '#fff': '#000'}
                />
            </Button>
            <View style={{ flexDirection: 'column' }}>
                <Text style={ 
                    darkTheme 
                    ? { ...theme_text.dark, fontSize: 20 } 
                    : { ...theme_text.light, fontSize: 20 } 
                }>{date} {m}</Text>
                <Text style={ 
                    darkTheme 
                    ? { ...theme_text.dark, fontSize: 20, textAlign: 'center' } 
                    : { ...theme_text.light, fontSize: 20, textAlign: 'center' } 
                }>{d}</Text>
            </View>
            <Button
                onPress={() => getNextDate()}
            >
                <Ionicons
                    name='arrow-forward'
                    size={25}
                    color={darkTheme ? '#fff': '#000'}
                />
            </Button>
        </ScrollView>
    )
}

export default DiaryScreen;