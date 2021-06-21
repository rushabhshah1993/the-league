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

export const setFinalRankings = (divisionId, list) => {
    return dispatch => {
        axios.put(`https://the-league-f702f-default-rtdb.firebaseio.com/finalRanking/${divisionId}.json`, {list})
            .then(response => {
                dispatch(addFinalRankings(divisionId, list));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const addFinalRankings = (divisionId, list) => {
    return {
        type: actions.ADD_FINAL_RANKINGS,
        payload: {
            division: divisionId,
            list: list
        }
    }
}
