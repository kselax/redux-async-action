import { combineReducers } from 'redux'

import postsBySubreddit from './postsBySubreddit'
import selectedSubreddit from './selectedSubreddit'

export default combineReducers({ postsBySubreddit, selectedSubreddit })