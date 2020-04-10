import { POST_ACTIONS, COMMENT_ACTIONS } from '../actions/types'

const initalState = {
  posts: {},
  post: {},
  comments: []
}

const BlogReducer = (state = initalState, action) => {
  switch (action.type) {
    case POST_ACTIONS.FETCH:
      return {
        ...state,
        post: action.payload
      }
    case POST_ACTIONS.FETCH_ALL:
      return {
        ...state,
        posts: action.payload,
      }
    case COMMENT_ACTIONS.FETCH_ALL:
      return {
        ...state,
        comments: action.payload
      }
    default:
      return state
  }
}

export default BlogReducer