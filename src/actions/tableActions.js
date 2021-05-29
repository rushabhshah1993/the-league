import axios from 'axios';
import * as actions from './actionTypes';

const tableUrl = `https://the-league-f702f-default-rtdb.firebaseio.com/table.json`;

export const fetchDivisionTable = () => {
    return dispatch => {
        axios.get(tableUrl)
            .then(response => {
                dispatch(setDivisionTable(response.data));
            })
    }
}

export const setDivisionTable = list => {
    return {
        type: actions.SET_DIVISION_TABLE,
        list: list
    }
}

export const addRoundPoints = list => {
    return dispatch => {
        axios.patch(tableUrl, list)
            .then(response => {
                dispatch(setDivisionTable(response.data));
            })
    }
}
