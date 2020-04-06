import { combineReducers } from 'redux'
import BlogReducer from './BlogReducer.js'
import PageReducer from './PageReducer.js'
import AppReducer from './AppReducer.js'
import ThemeOptions from './ThemeOptions.js'

export default combineReducers ({
  BlogReducer,
  PageReducer,
  ThemeOptions,
  AppReducer
})