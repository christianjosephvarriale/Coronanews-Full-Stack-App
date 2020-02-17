import { APP_ACTIONS } from './types';

export const toggleLoader = () => dispatch => {
    dispatch({
        type: APP_ACTIONS.TOGGLE_LOAD,
    })
}