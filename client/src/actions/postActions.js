import { POST_ACTIONS, COMMENT_ACTIONS } from './types';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const contentful = require('contentful');

const client = contentful.createClient({
    space: '5zy76n4olg5p',
    accessToken: 'yln9S1YCj8AIS5nH2VqxkQHma2xYmn4n7qRwVviHT2s'
});

/**
 * Description:
 *  1. Queries the database to retreive all posts
 *  2. If region is not undefined it will retreive based on region
 */
export const fetchAllPosts = (page, region) => dispatch => {
    if (region) {
        axios.get(`/posts/region/${region}/${page}`)
        .then((res) => {
            const posts = res.data
            console.log(posts)
            dispatch({
                type: POST_ACTIONS.FETCH_ALL,
                payload: posts
            })
        })
        .catch(console.error)
    } else {
        axios.get(`/posts/${page}`)
        .then((res) => {
            const posts = res.data
            dispatch({
                type: POST_ACTIONS.FETCH_ALL,
                payload: posts
            })
        })
        .catch(console.error)
    }
}

/**
 * Description:
 *  1. Queries the database to retreive based on title
 *  2. response contains 3 objects, post, prevPost, nextPost
 */
export const fetchPost = title => dispatch => {
    axios.post('/posts/title',
    { title: title })
    .then((res) => {
        const post = res.data
        dispatch({
            type: POST_ACTIONS.FETCH,
            payload: post
        })
    });
} 