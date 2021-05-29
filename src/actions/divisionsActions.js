import axios from 'axios';
import * as actions from './actionTypes';

const divisionsUrl = "https://the-league-f702f-default-rtdb.firebaseio.com/divisions.json";

export const fetchDivisionsData = () => {
    return dispatch => {
        axios.get(divisionsUrl)
            .then(response => {
                dispatch(setDivisions(response.data));
            })
    }
}

export const setDivisions = list => {
    return {
        type: actions.SET_DIVISIONS_LIST,
        list: list
    }
}

export const addDivisionPoints = list => {
    return dispatch => {
        axios.patch(divisionsUrl, list)
            .then(response => {
                dispatch(setDivisions(response.data));
            })
    }
}

export const updateDivisionLeader = (divisionId, leaderId) => {
    return dispatch => {
        axios.patch(`https://the-league-f702f-default-rtdb.firebaseio.com/divisions/${divisionId}.json`, {leader: leaderId})
            .then(() => {
                axios.get(divisionsUrl).then(response => {
                    dispatch(setDivisions(response.data));
                })
            })
    }
}
