const initialState = {
    subject: [],
    subjectName: '',
    selectedLesson: {},
    isSelected: false
}

export const loadsReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_SUBJECT':

            return {
                ...state,
                subject: action.payload,
                subjectName: action.name
            }

        case 'SELECT_LESSON':

            return {
                ...state,
                selectedLesson: action.payload,
                isSelected: !state.isSelected
            }

        default:
            return state
    }
}