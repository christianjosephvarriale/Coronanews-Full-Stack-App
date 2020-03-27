import { POST_ACTIONS, COMMENT_ACTIONS } from './types';
import axios from 'axios';

/**
 * Description:
 *  1. Queries the database to retreive all posts
 *  2. If region is not undefined it will retreive based on region
 */
export const fetchAllPosts = region => dispatch => {
    if (region) {
        axios.get(`/posts/region/${region}`)
        .then((res) => {
            const rawPosts = res.data
            const posts = [];
            const featPosts = [];

            for (let i=0; i<rawPosts.length; i++) { /* sort */
                if (rawPosts[i].featured) {
                    featPosts.push(rawPosts[i])
                } else {
                    posts.push(rawPosts[i])
                }
            }

            dispatch({
                type: POST_ACTIONS.FETCH_ALL,
                payload: { posts, featPosts }
            })
        })
        .catch(console.error)
    } else {
        axios.get('/posts')
        .then((res) => {
            const rawPosts = res.data
            const posts = [];
            const featPosts = [];

            for (let i=0; i<rawPosts.length; i++) { /* sort */
                if (rawPosts[i].featured) {
                    featPosts.push(rawPosts[i])
                } else {
                    posts.push(rawPosts[i])
                }
            }

            dispatch({
                type: POST_ACTIONS.FETCH_ALL,
                payload: { posts, featPosts }
            })
        })
        .catch(console.error)
    }
}

/**
 * Description:
 *  1. Queries the database to retreive based on title
 */
export const fetchPost = title => dispatch => {
    axios.post('/posts/title',
    {
        title: title
    })
    .then((res) => {
        const post = res.data
        debugger;
        dispatch({
            type: POST_ACTIONS.FETCH,
            payload: post
        })
    });
} 