import { SELECT_SUBREDDIT } from '../actionTypes.js'

const initialState = 'reactjs'

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_SUBREDDIT: {
      return action.payload.subreddit
    }
    default:
      return state
  }
}