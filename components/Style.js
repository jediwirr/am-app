import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
    }
  });