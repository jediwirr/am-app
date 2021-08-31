import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-paper';

import { styles } from '../components/Style';

const SettingsScreen = () => {
    const [isSwitchOn, setSwitchOn] = useState(false)

    const onToggleSwitch = () => setSwitchOn(!isSwitchOn)

    return (
        <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            marginTop: 10, 
            paddingLeft: 5 
        }}>
            <Text style={{
                fontSize: 21
            }}>
                Тёмная тема
            </Text>
            <View>
                <Switch 
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                />
            </View>
        </View>
    )
}

export default SettingsScreen;