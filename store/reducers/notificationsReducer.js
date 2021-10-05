const initialState = {
    expoPushToken: '',
    message: {}
};

export const notificationsReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_TOKEN':

        return {
            ...state,
            expoPushToken: action.expoPushToken
        }

        case 'SEND_NOTIFICATION':
            
            return {
                ...state,
                message: action.message
            }

        default:

            return state
    }

};