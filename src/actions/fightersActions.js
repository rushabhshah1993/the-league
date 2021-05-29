import axios from 'axios';
import * as actions from './actionTypes';

const fightersUrl = 'https://the-league-f702f-default-rtdb.firebaseio.com/fighters.json';

export const fetchFightersList = () => {
    return dispatch => {
        axios.get(fightersUrl)
            .then(response => {
                dispatch(setFightersList(response.data));
            })
    }
}

export const setFightersList = list => {
    return {
        type: actions.SET_FIGHTERS_LIST,
        list: list
    }
}

export const updateFighterRoundResult = list => {
    return dispatch => {
        axios.patch(fightersUrl, list)
            .then(response => {
                dispatch(updateFighters(response.data));
            })
    }
}

export const updateFighters = list => {
    return {
        type: actions.UPDATE_FIGHTER_ROUND_RESULT,
        list: list
    }
}
