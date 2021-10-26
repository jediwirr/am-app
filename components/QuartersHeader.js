import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { useDispatch } from "react-redux";

import { styles } from '../components/Style';

const QuarterHeader = ({term}) => {
    const periods = ['1', '2', '3', '4', '5', '6'];
    const dispatch = useDispatch();
    const setTerm = (payload) => dispatch({type: 'SET_TERM', payload});

    return (
        <View style={styles.period_list_container}>
            {periods.map(period =>
                <TouchableOpacity
                    key={period}
                    style={
                        {
                            ...styles.period, 
                            backgroundColor: term === period 
                            ? '#9E9E9E' 
                            : '#c9c9c9'
                        }
                    }
                    onPress={() =>
                        {
                            setTerm(period)
                            console.log(`${term} - term, ${period} - period`)
                        }
                    }
                >
                    <Text
                        key={period}
                        style={{textAlign: 'center'}}
                    >
                        {
                            period === '3' 
                            ? 'I' 
                            : period === '4' 
                            ? '3'
                            : period === '5' 
                            ? '4'
                            : period === '6' 
                            ? 'II'
                            : period
                        }
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default QuarterHeader;