const initialState = {
    isSignedIn: false,
    user: '',
    userType: '',

}

export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOG_IN':
        
            return {
                ...state,
                isSignedIn: true,
                user: action.user,
                userType: action.user_type,
                userData: action.user_data
            }

        case 'LOG_OUT':
        
            return {
                ...state,
                isSignedIn: false
            }

        default:
            return state
    }
}