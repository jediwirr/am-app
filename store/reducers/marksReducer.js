const initialState = {
    marks: ''
}

export const marksReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_MARKS':
            
            return {
                marks: action.payload
            }

        default:

            return state
    }

}