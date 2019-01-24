import { SELECT_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS, INVALIDATE_SUBREDDIT } from './actionTypes.js'

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  payload: { subreddit }
})

export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  payload: { subreddit }
})

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  payload: { subreddit }
})

export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  payload: { 
    subreddit, 
    items: json.data.children.map(child => child.data),
    lastUpdated: Date.now()
  }
})

const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}