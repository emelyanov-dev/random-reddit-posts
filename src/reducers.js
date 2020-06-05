import {combineReducers} from 'redux';
import undoable from 'redux-undo';
import {ADD_RANDOM_POST, DROP_POST, INVALIDATE_SUBREDDIT, LIKE_POST, REMOVE_POST, REQUEST_POSTS,} from './actions'


function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }

    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }

    case ADD_RANDOM_POST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [...state.items, action.post],
      }

    case LIKE_POST:
      return {
        ...state,
        items: state.items.map(post =>
          post.id === action.postId
            ?
            {
              ...post,
              isLiked: !post.isLiked
            }
            :
            post
        ),
      }

    case REMOVE_POST:
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.postId)
      }

    case DROP_POST:
      const {items} = state;
      items.splice(action.index, 0, ...items.splice(action.postIndex, 1));
      return {
        ...state,
        items
      }


    default:
      return state
  }
}

const rootReducer = combineReducers({
  posts: undoable(posts, {
    limit: 10
  })
});

export default rootReducer