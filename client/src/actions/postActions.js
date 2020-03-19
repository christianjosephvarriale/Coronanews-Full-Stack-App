import { POST_ACTIONS, COMMENT_ACTIONS } from './types';
import axios from 'axios';

/**
 * Description:
 *  1. Queries the database to retreive all posts
 */
export const fetchAllPosts = () => dispatch => {

    axios.get('/posts')
        .then((res) => {
            const posts = res.data
            dispatch({
                type: POST_ACTIONS.FETCH_ALL,
                payload: { posts }
            })
        })
        .catch(console.error)
}

/**
 * Description:
 *  1. Queries the database to retreive based on Id
 */
export const fetchPost = id => dispatch => {

    axios.get(`/posts/${id}`)
        .then((res) => {
            const post = res.data
            dispatch({
                type: POST_ACTIONS.FETCH,
                payload: post
            })
        });
} 

export const fetchComments = id => dispatch => {
    axios.get( '/comments/?post=' + id )
    .then((response) => {
        dispatch({
            type: COMMENT_ACTIONS.FETCH_ALL,
            payload: response.data
        })
    })
    .catch((error) => { throw(error) } )
}