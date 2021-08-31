import { createStore } from 'redux';

const initialState = {
    isSignedIn: false
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

        default:
            return state
    }
}

export const store = createStore(reducer);