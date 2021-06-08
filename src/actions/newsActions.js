import axios from 'axios';
import * as actions from './actionTypes';

export const fetchNews = () => {
    return dispatch => {
        axios.get('https://the-league-f702f-default-rtdb.firebaseio.com/news.json')
            .then(response => {
                dispatch(setNews(response.data));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const setNews = news => {
    return {
        type: actions.SET_NEWS,
        news: news
    }
}
