const initialState = {
    marks: '',
    term: '1'
};

export const marksReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_MARKS':
            
            return {
                ...state,
                marks: action.payload
            }

        case 'SET_TERM':

        return {
            ...state,
            term: action.payload
        }

        default:
            return state
    };

};