import React from 'react';
import {Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as Linking from "expo-linking";

const Links = ({col, navigation}) => {

    const socialMedia = [
        {icon: 'logo-vk', color: '#3e49cb', url: 'https://vk.com/almamater_spb'},
        {icon: 'logo-facebook', color: '#3e49cb', url: 'https://www.facebook.com/almamaterspb'},
        {icon: 'logo-youtube', color: '#ff0000', url: 'https://www.youtube.com/user/almamaterspb'},
        {icon: 'logo-instagram', color: '#840c5b', url: 'https://www.instagram.com/almamaterspb/'},
        {icon: 'pencil-outline', color: '#3e49cb', url: 'https://gimnazist.spb.ru/'},
        // {icon: 'images-outline', color: '#3e49cb', url: 'https://diary.alma-mater-spb.ru/gallery/#'}
    ];

    const handleLink = (url) => Linking.openURL(url);

    return (
        <View>
            <Text style={{fontSize: 16, color: col, textAlign: 'center', marginBottom: 15}}>
                Ссылки на социальные сети гимназии:
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {socialMedia.map(item =>
                        <View key={item.icon} style={{backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <Ionicons
                                key={item.icon}
                                name={item.icon}
                                size={25}
                                color={item.color}
                                onPress={
                                    () => item.icon === 'pencil-outline' 
                                    ?  navigation.navigate('Гимназист')
                                    : handleLink(item.url)
                                }
                            />
                        </View>
                )}
            </View>
        </View>
    );
};

export default Links;