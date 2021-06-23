import * as actions from './../actions/actionTypes';

import { cloneDeep } from 'lodash';
// const initialState = {
//     division1: {
//         label: "Division 1",
//         currentRound: 1,
//         leader: "Sayali Raut"
//     },
//     division2: {
//         label: "Division 2",
//         currentRound: 2,
//         leader: "Krishi Punamiya"
//     },
//     division3: {
//         label: "Division 3",
//         currentRound: 5,
//         leader: "Vinaya Rao"
//     }
// }

const initialState = {};

const divisionsReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SET_DIVISIONS_LIST:
            let updatedState = cloneDeep(state);
            updatedState = action.list;
            return updatedState;
        case actions.ADD_FINAL_RANKINGS:
            updatedState = cloneDeep(state);
            updatedState[action.payload.division]["finalTable"] = action.payload.list;
            updatedState[action.payload.division]["finalTableRanks"] = action.payload.rankData;
            return updatedState;
        default: return state;
    }
}

export default divisionsReducer;
