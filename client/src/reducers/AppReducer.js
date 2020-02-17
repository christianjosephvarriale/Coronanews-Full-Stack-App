import { APP_ACTIONS } from '../actions/types'

const initalState = {
    loading: true
}


const AppReducer = (state = initalState, action) => {
    switch (action.type) {
      case APP_ACTIONS.TOGGLE_LOAD:
        return {
          loading: !state.loading
        }
        default:
        return {
            ...state
        }
    }
}

export default AppReducer;