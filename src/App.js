import React from 'react'
import { connect } from 'react-redux'

import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from './redux/actions.js'

class App extends React.Component {

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange = e => {
    this.props.dispatch(selectSubreddit(e.target.value))
  }

  handleRefreshClick = e => {
    e.preventDefault()
    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, isFetching, lastUpdated, items } = this.props
    const isEmpty = items.length === 0
    
    return (
      <div>
      <span>
        <h1>{selectedSubreddit}</h1>
        <select 
          onChange={this.handleChange} 
          value={ selectedSubreddit }
        >
          {[ 'reactjs', 'frontend' ].map(option =>
            <option value={option} key={option}>
              {option}
            </option>
          )}
        </select>
      </span>
      <p>
        {lastUpdated &&
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
          </span>
        }
        {!isFetching &&
          <button onClick={this.handleRefreshClick}>
            Refresh
          </button>
        }
      </p>
      {isEmpty
        ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
        : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            {items.map((post, i) => 
              <li key={i}>{post.title}</li>
            )}
          </div>
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit } = state
  
  const { 
    isFetching, 
    lastUpdated, 
    items 
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)