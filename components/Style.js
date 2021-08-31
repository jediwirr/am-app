import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 70,
        paddingVertical: 6,
        marginTop: 20
    },
    greeting: {
        fontSize: 25,
        color: '#fff'
    },
    logo: {
        width: 40,
        height: 30,
        marginLeft: 10
    },
    logoText: {
        paddingBottom: 10,
        fontSize: 23,
        color: '#fff'
    },
    list: {
        padding: 10
    },
    listItem: {
        fontSize: 21,
        marginLeft: 10,
    },
    listItemContainer: {
        paddingVertical: 12,
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    modalPanel: {
        flexDirection: 'row',
        padding: 25
    },
    modalButton: {
        // margin: 15
        color: 'red'
    }
  });