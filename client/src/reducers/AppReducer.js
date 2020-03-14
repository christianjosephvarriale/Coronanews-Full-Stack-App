import { APP_ACTIONS } from '../actions/types'

const initalState = {
    loading: true,
    mobile: true
}

const AppReducer = (state = initalState, action) => {
    switch (action.type) {
      case APP_ACTIONS.LOADER_ON:
        return {
          ...state,
          loading: true
      }
      case APP_ACTIONS.LOADER_OFF:
        return {
          ...state,
          loading: false
      }
      case APP_ACTIONS.MOBILE_ON:
        return {
          ...state,
          mobile: true
      }
      case APP_ACTIONS.MOBILE_OFF:
        return {
          ...state,
          mobile: false
      }
      default:
      return {
          ...state
      }
    }
}

export default AppReducer;