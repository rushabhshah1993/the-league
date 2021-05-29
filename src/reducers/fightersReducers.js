import * as actions from './../actions/actionTypes';

import { cloneDeep } from 'lodash';

const initialState = {};

const fightersReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SET_FIGHTERS_LIST:
            let updatedState = cloneDeep(state);
            updatedState = action.list;
            return updatedState;
            // return state = action.list;
        default: return state;
    }
}

export default fightersReducer;
