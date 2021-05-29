import * as actions from './../actions/actionTypes';

const initialState = {};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.UPDATE_FIGHTER_IMGS:
            state = {...action.fighters};
            return state;
        default: return state;
    }
}

export default reducer;
