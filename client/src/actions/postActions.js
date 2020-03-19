import { POST_ACTIONS, COMMENT_ACTIONS } from './types';
import axios from 'axios';
const uuid = require('uuid')

const url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=764acb82041f45f7a8bc847b05da23cc';

        //   export const fetchAllPosts = () => dispatch => {

        //     axios.get('/posts')
        //         .then((p   //             const posts = [];
        
        //             // update the state of the app with the news entries
        //             for (let i=0; i < posts; i++) {
        //                 let entry = {
        //                     'id': uuid(),
        //                     'author':post.author,
        //                     'body':post.content,
        //                     'date':post.publishedAt,
        //                     'headerImg':post.urlToImage,
        //                     'title':post.title,
        //                 }
        
        //             }
        
        //             dispatch({
        //                 type: POST_ACTIONS.FETCH_ALL,
        //                 payload: { posts }
        //             })
        //         })
        //         .catch(console.error)
        // }

/**
 * Description:
 *  1. Queries the database to retreive all posts
 */
export const fetchAllPosts = () => dispatch => {

    axios.get('/posts')
        .then((posts) => {
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

    axios.get(`/post?id=${id}`)
        .then((post) => {
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