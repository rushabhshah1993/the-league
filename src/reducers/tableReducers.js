import * as actions from './../actions/actionTypes';

import { cloneDeep } from 'lodash';

// const initialState = {
//     table: {
//         division1: {
//             points: {
//                 fighter1: 23,
//                 fighter2: 46
//             }
//         }
//     }
// }

const initialState = {};

const tableReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SET_DIVISION_TABLE:
            let updatedState = cloneDeep(state);
            updatedState = action.list;
            return updatedState;
            // return state = action.list;
        default: return state;
    }
}

export default tableReducer;
