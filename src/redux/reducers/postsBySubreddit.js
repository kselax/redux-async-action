import { REQUEST_POSTS, RECEIVE_POSTS, INVALIDATE_SUBREDDIT } from '../actionTypes.js'


const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT: {
      return {
        ...state,
        didInvalidate: true
      }
    }
    case REQUEST_POSTS: {
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    }
    case RECEIVE_POSTS: {
      const { items, lastUpdated } = action.payload
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items,
        lastUpdated
      }
    }
    default:
      return state
  }
}

export default function (state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS: 
    case RECEIVE_POSTS: {
      const { subreddit } = action.payload
      return {
        ...state,
        [subreddit]: posts(state[subreddit], action),
      }
    }
    default:
      return state
  }
}