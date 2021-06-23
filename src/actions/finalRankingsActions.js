import axios from 'axios';
import * as actions from './actionTypes';

export const fetchFinalRankings = () => {
    return dispatch => {
        axios.get(`https://the-league-f702f-default-rtdb.firebaseio.com/finalRanking.json`)
            .then(response => {
                dispatch(setFinalRankings(response.data));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const setFinalRankings = data => {
    return {
        type: actions.FETCH_FINAL_RANKINGS,
        data: data
    }
}
