import {cacheFetch, randomInteger} from "./utils";

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REMOVE_POST = 'REMOVE_POST';
export const LIKE_POST = 'LIKE_POST';
export const DROP_POST = 'DROP_POST';
export const ADD_RANDOM_POST = 'ADD_RANDOM_POST';


function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}


function addRandomPost(posts) {
  return {
    type: ADD_RANDOM_POST,
    post: posts[randomInteger(0, posts.length - 1)],
  }
}


export function fetchRandomPost(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return cacheFetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(json => dispatch(addRandomPost(json.data.children.map(child => child.data))))
  }
}


export function removePost(postId) {
  return {
    type: REMOVE_POST,
    postId
  }
}


export function likePost(postId) {
  return {
    type: LIKE_POST,
    postId
  }
}


export function dropItem({postIndex, index}) {
  return {
    type: DROP_POST,
    postIndex,
    index
  }
}