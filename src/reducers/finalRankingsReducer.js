import * as actions from './../actions/actionTypes';
const initialState = {};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.FETCH_FINAL_RANKINGS:
            return action.data;
        default: return state;
    }
}

export default reducer;
