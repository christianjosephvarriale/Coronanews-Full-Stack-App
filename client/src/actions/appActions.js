import { APP_ACTIONS } from './types';

export const toggleLoader = ( state ) => dispatch => {
    if (state == 'ON') {
        dispatch({
            type: APP_ACTIONS.LOADER_ON,
        })
    } else if (state == 'OFF') {
        dispatch({
            type: APP_ACTIONS.LOADER_OFF,
        })
    } else {
        throw Error('Action not recognized');
    }
}

export const toggleMobile = ( state ) => dispatch => {
    if (state == 'ON') {
        dispatch({
            type: APP_ACTIONS.MOBILE_ON,
        })
    } else if (state == 'OFF') {
        dispatch({
            type: APP_ACTIONS.MOBILE_OFF,
        })
    } else {
        throw Error('Action not recognized');
    }
}