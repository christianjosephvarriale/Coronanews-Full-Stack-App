import { POST_ACTIONS, COMMENT_ACTIONS } from './types';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
const contentful = require('contentful');

const client = contentful.createClient({
    space: '5zy76n4olg5p',
    accessToken: 'yln9S1YCj8AIS5nH2VqxkQHma2xYmn4n7qRwVviHT2s'
});

export const fetchAllPosts = () => dispatch => {

    client.getEntries({
        content_type: 'blogPost'
    })
        .then((res) => {

            console.log(res.items)
            var prevPosts = res.items;

            var featPosts = [];    
            var posts = [];

            // update the state of the app with the blog entries
            for (let i=0; i < prevPosts.length; i++) {
                let entry = {
                    'id': prevPosts[i].fields.id,
                    'author':prevPosts[i].fields.author,
                    'body':prevPosts[i].fields.body,
                    'date':prevPosts[i].fields.date,
                    'headerImg':prevPosts[i].fields.headerImage.fields.file.url,
                    'catagory': prevPosts[i].fields.catagory,
                    'title':prevPosts[i].fields.title,
                    'id':prevPosts[i].fields.id,
                    'tags':prevPosts[i].fields.tags,
                }

                 // this is a featured post
                 if ( prevPosts[i].fields.featured ) { featPosts.push(entry); } 
                 else { posts.push(entry); }
            }

            dispatch({
                type: POST_ACTIONS.FETCH_ALL,
                payload: { posts, featPosts }
            })
            console.log('dispatched');
        })
        .catch(console.error)
}

export const fetchPost = id => dispatch => {
    client.getEntry(id)
        .then((post) => {
            console.log(`Here is the returned val ${JSON.stringify(post)} based on id: ${id}`);

            const rawRichTextField = post.fields.body;
            console.log(rawRichTextField)

            let options = {
                renderNode: {
                  'embedded-asset-block': (node) =>
                    `<img style="width:100%" src="${node.data.target.fields.file.url}"/>`,
                   [BLOCKS.PARAGRAPH]: (node, next) =>
                    `<p>${next(node.content)}</p>`
                },
            }

            const body = documentToHtmlString(rawRichTextField, options);
            console.log(body)
            let entry = {
                'author':post.fields.author,
                'body':body,
                'date':post.fields.date,
                'headerImg':post.fields.headerImage.fields.file.url,
                'catagory': post.fields.catagory,
                'title':post.fields.title,
                'id':post.fields.id,
                'tags':post.fields.tags,
            }
            console.log(entry);
            dispatch({
                type: POST_ACTIONS.FETCH,
                payload: entry
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