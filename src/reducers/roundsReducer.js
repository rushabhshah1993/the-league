import * as actions from './../actions/actionTypes';

import { cloneDeep } from 'lodash';

const intialState = {};

const roundsReducer = (state=intialState, action) => {
    switch(action.type) {
        case actions.SET_ROUNDS_LIST:
            let updatedState = cloneDeep(state);
            updatedState = action.list;
            return updatedState;
            // return state = action.list;
        default: return state;
    }
}

export default roundsReducer;
