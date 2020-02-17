import { combineReducers } from 'redux'
import BlogReducer from './BlogReducer.js'
import PageReducer from './PageReducer.js'
import AppReducer from './AppReducer.js'

export default combineReducers({
  BlogReducer: BlogReducer,
  PageReducer: PageReducer,
  AppReducer: AppReducer
})