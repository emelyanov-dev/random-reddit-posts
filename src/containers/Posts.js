import React, {Component} from 'react';
import {connect} from 'react-redux'
import {ActionCreators} from "redux-undo";
import {dropItem, fetchRandomPost, likePost, removePost} from '../actions'

import TagsGroup from "../components/TagsGroup";
import Button from "../components/Button";
import {Card, CardControls, CardHeader, CardTitle} from "../components/Card";
import Feed from "../components/Feed";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.handleDropItem = this.handleDropItem.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.handleRemovePost = this.handleRemovePost.bind(this);
    this.handleLikePost = this.handleLikePost.bind(this);
    this.handleSelectSubreddit = this.handleSelectSubreddit.bind(this);
  }


  handleDropItem(props) {
    this.props.dispatch(dropItem(props))
  }

  handleUndo() {
    this.props.dispatch(ActionCreators.undo())
  }

  handleRedo() {
    this.props.dispatch(ActionCreators.redo())
  }

  handleRemovePost(postId) {
    this.props.dispatch(removePost(postId));
  }

  handleLikePost(postId) {
    this.props.dispatch(likePost(postId));
  }

  handleSelectSubreddit(nextSubreddit) {
    this.props.dispatch(fetchRandomPost(nextSubreddit));
  }

  render() {
    const {
      items,
      isFetching,
      future,
      past
    } = this.props;

    return (
      <>
        <TagsGroup tags={['Frontend', 'Angular', 'Vue', 'React']} onSelect={this.handleSelectSubreddit}/>
        <Card>
          <CardHeader>
            <CardTitle title='Posts'/>
            <CardControls>
              <Button onClick={this.handleUndo} icon='undo'
                      title='Undo' theme='blue' disabled={past && past.length === 0}/>
              <Button onClick={this.handleRedo} icon='redo'
                      title="Redo" theme='blue' disabled={future && future.length === 0}/>
            </CardControls>
          </CardHeader>
          {
            items.length > 0 &&
            <Feed
              isFetching={isFetching}
              items={items}
              onRemovePost={this.handleRemovePost}
              onLikePost={this.handleLikePost}
              onDropItem={this.handleDropItem}
            />
          }
        </Card>
      </>
    );
  }
}

function mapStateToProps(state) {
  const {selectedSubreddit, posts} = state;
  const {isFetching, items} = posts.present || {
    isFetching: true,
    items: [],
  };

  const {
    future,
    past,
  } = posts;

  return {
    selectedSubreddit,
    items,
    isFetching,
    future,
    past,
  }
}

export default connect(mapStateToProps)(Posts);