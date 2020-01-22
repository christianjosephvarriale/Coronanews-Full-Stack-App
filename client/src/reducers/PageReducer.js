import { SUBSCRIPTION_ACTIONS } from '../actions/types'

const initalState = {
    open: false
}

const PageReducer = (state = initalState, action) => {
    switch (action.type) {
        case SUBSCRIPTION_ACTIONS.TOGGLE_OPEN:
          return {
            ...state,
            open: !state.open
            } 
        default:
          return state
    } 
}

export default PageReducer;