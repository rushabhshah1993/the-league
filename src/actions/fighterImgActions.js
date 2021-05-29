import * as actions from './actionTypes';

export const updateFighterImgs = fighters => {
    // console.log("Here", fighters);
    return {
        type: actions.UPDATE_FIGHTER_IMGS,
        fighters: fighters
    }
}
