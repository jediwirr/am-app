const initialState = {
    openLesson: false,
    lessons: [],
    lesson: {}
}

export const lessonReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_LESSON_INFO':

            return {
                ...state,
                openLesson: !state.openLesson,
                lesson: action.lesson
            }

        case 'SET_LESSONS':

            return {
                ...state,
                lessons: action.payload
            }

        default:
            return state
    }
}