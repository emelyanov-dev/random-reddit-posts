import React from "react";
import Post from "../Post";
import './Feed.scss';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragged: false,
      position: {
        x: 0,
        y: 0
      },
      items: props.items
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.getFeedListRef = this.getFeedListRef.bind(this);
  }

  handleDragStart(e, postIndex) {
  }

  handleDrag(e, postIndex) {
  }

  _calculateDropIndex(clientY) {
    return Math.floor((clientY - this.refFeedList.getBoundingClientRect().top) / 56)
  }

  handleDragEnd(e, postIndex) {
    this.props.onDropItem({
      postIndex,
      index: this._calculateDropIndex(e.clientY)
    })
  }

  getFeedListRef(ref) {
    this.refFeedList = ref;
  }

  render() {
    const {isFetching, onRemovePost, onLikePost} = this.props;
    return (
      <ul className='feed' ref={this.getFeedListRef}>
        {
          this.props.items.map((post, index) =>
            <li className="feed__item-wrapper" key={`feed_item_${post.id}${index}`}>
              <div className='feed__item'
                   onDragStart={e => this.handleDragStart(e, index)}
                   onDrag={e => this.handleDrag(e, index)}
                   onDragEnd={e => this.handleDragEnd(e, index)}
              >
                <Post
                  title={post.title}
                  to={post.url}
                  isLiked={post.isLiked}
                  onRemove={() => onRemovePost(post.id)}
                  onLike={() => onLikePost(post.id)}
                />
              </div>
            </li>
          )
        }
        {
          isFetching && <div className="feed__item-loader"/>
        }
      </ul>
    )
  }
}

export default Feed;