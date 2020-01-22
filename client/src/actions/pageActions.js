import { SUBSCRIPTION_ACTIONS } from './types';

export const toggleSubscriptionState = () => dispatch => {
    dispatch({
        type: SUBSCRIPTION_ACTIONS.TOGGLE_OPEN,
    })
    console.log('dispatched toggle sub state');
}