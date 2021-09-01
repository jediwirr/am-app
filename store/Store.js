import { createStore } from 'redux';

const initialState = {
    isSignedIn: false,
    darkTheme: false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOG_IN':
        
            return {
                ...state,
                isSignedIn: true
            }

        case 'LOG_OUT':
        
            return {
                ...state,
                isSignedIn: false
            }

        case 'CHANGE_THEME':
    
            return {
                ...state,
                darkTheme: !state.darkTheme
            }

        default:
            return state
    }
}

export const store = createStore(reducer);