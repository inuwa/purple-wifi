import React, { Component } from 'react';

class PostDetail extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        <h4>{post.name}</h4>
        <p>{post.type}</p>
        <p>{post.chartType}</p>
        <p>{post.filterTypes}</p>
        <p>{post.frequency}</p>
        <p>{post.active}</p>
        <br />
      </div>
    );
  }
}

export default PostDetail;