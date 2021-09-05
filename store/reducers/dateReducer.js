const initialState = {
    stringDate: '',
    stringMonth: '',
    stringDay: ''
}

export const dateReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_DATE':

            return {
                ...state,
                stringDate: action.date
            }

        case 'SET_MONTH':

            return {
                ...state,
                stringMonth: action.month
            }

        case 'SET_DAY':

            return {
                ...state,
                stringDay: action.day
            }

        default:
            return state
    }
}