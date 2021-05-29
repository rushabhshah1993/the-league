import axios from 'axios';
import * as actions from './actionTypes';

const roundsUrl = 'https://the-league-f702f-default-rtdb.firebaseio.com/rounds.json';

export const fetchAllRounds = () => {
    return dispatch => {
        axios.get(roundsUrl)
            .then(response => {
                dispatch(setRoundsList(response.data));
            })
    }
}

export const setRoundsList = list => {
    return {
        type: actions.SET_ROUNDS_LIST,
        list: list
    }
}

export const setRoundsResult = list => {
    return dispatch => {
        axios.patch(roundsUrl, list)
            .then(response => {
                dispatch(setRoundsList(response.data));
            })
    }
}

// export const updateRoundsDetails = list => {
//     return {
//         type: actions.SET_ROUNDS_LIST,
//         list: list
//     }
// }
