import * as actions from './../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = [];

const reducer = (state=initialState, action) => {
    let clonedState = cloneDeep(state);
    switch(action.type) {
        case actions.SET_NEWS:
            clonedState = action.news;
            return clonedState;
        default: return state;
    }
}

export default reducer;
