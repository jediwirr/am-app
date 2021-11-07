import React from 'react';
import { Share, Text, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const UserPanel = (props) => {
    const userid = useSelector(state => state.gym.userid);
    const pubDate = props.datetime.substring(0, 10).split('-').reverse().join('.');

    const dispatch = useDispatch();

    const handle = (id, by_user) => dispatch({type: 'HANDLE_LIKES', id, by_user});
    const unhandle = (id, by_user) => dispatch({type: 'UNHANDLE_LIKES', id, by_user});
    const showErrorScreen = () => dispatch({type: 'SHOW_ERROR'});

    const deleteLikes = () => {
        unhandle(props.title, userid);

        fetch(`http://${props.ip}/likes/like/${userid}liked${props.title}/`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 404) {
                showErrorScreen();
            };
        });
    }

    const manageLikes = () => {
        const {ip, title} = props;
        return async (dispatch) => {
    
            try {
                const data = await fetch(`http://${ip}/likes/`, {
                    method: 'GET'
                });

                const data_1 = await data.json();

                let users = JSON.stringify(data_1);

                if (userid === null) {
                    Alert.alert('Войдите, чтобы отмечать понравившиеся материалы');
                } else if (!users.includes(`${userid}liked${props.title}`)) {
                    handle(title, userid);
                } else {
                    deleteLikes();
                }
            } catch (error) {
                return console.log(error);
            }
        }
    };

    const onShare = async (uri) => {
        try {
            const result = await Share.share({
                message: uri
            })
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <View>
            <Text style={{
                fontWeight: 'bold', 
                fontSize: 16, 
                flexDirection: 'row', 
                justifyContent: 'space-around',
                paddingTop: 5,
                paddingLeft: 20
                }}
            >{props.numOfLikes === 0 ? '' : `Понравилось: ${props.numOfLikes}`}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={{padding: 10, fontStyle: 'italic'}}>{pubDate}</Text>
                {/* <Ionicons 
                    name={props.color === "gray" ? "heart-outline" : "heart"}
                    size={25}
                    color={props.color}
                    onPress={manageLikes()}
                /> */}
                <Ionicons 
                    name="share-social-outline"
                    size={25}
                    color='gray'
                    onPress={() => onShare(props.uri)}
                />
            </View>
        </View>
    )
}

export default UserPanel;
