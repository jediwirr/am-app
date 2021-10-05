const initialState = {
    marks: ''
};

export const marksReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_MARKS':
            
            return {
                ...state,
                marks: action.payload
            }

        default:
            return state
    };

};