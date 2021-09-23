import React from 'react';
import {Text, View, Dimensions} from "react-native";
import {Button} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import * as Linking from "expo-linking";

const Links = ({col}) => {
    const {height} = Dimensions.get('screen');

    const socialMedia = [
        {icon: 'logo-vk', color: '#3e49cb', url: 'https://vk.com/almamater_spb'},
        {icon: 'logo-facebook', color: '#3e49cb', url: 'https://www.facebook.com/almamaterspb'},
        {icon: 'logo-youtube', color: 'red', url: 'https://www.youtube.com/user/almamaterspb'},
        {icon: 'logo-instagram', color: 'purple', url: 'https://www.instagram.com/almamaterspb/'},
        {icon: 'pencil-outline', color: '#3e49cb', url: 'https://gimnazist.spb.ru/'}
    ];

    const handleLink = (url) => Linking.openURL(url);

    return (
        <View style={{marginTop: height / 2.5}}>
            <Text style={{fontSize: 16, color: col, textAlign: 'center', marginBottom: 10}}>
                Ссылки на социальные сети:
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {socialMedia.map(item =>
                    <Button key={item.icon}
                            onPress={() => handleLink(item.url)}
                    >
                        <View style={{backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <Ionicons key={item.icon}
                                      name={item.icon}
                                      size={25}
                                      color={item.color}
                            />
                        </View>
                    </Button>
                )}
            </View>
        </View>
    );
};

export default Links;