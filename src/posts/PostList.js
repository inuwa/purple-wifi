import React, { Component } from 'react';
import Posts from '../data/mock-data.json';
import PostDetail from './PostDetail';
import { Pagination } from 'react-bootstrap';
import PostForm from './PostForm';
class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filtered: [],
      posts: [],
      filter: ['select'],
      currentPage: 1,
      postsPerPage: 2
    };
    this.ascending = this.ascending.bind(this);
    this.descending = this.descending.bind(this);
    this.filter = this.filter.bind(this);
    this.remove = this.remove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.LOCALSTORAGE_KEY = 'Purple-Wifi';
  }

  // Loads the posts to the state
  loadPosts = () => {
    const posts = JSON.parse(window.localStorage.getItem(this.LOCALSTORAGE_KEY));
    this.setState({ 
      filtered: posts,
      posts,
      filter: posts.map((post) => post.type).filter((value, index, self) => self.indexOf(value) === index)
    });
  }

  // validates the posts to the state
  validatePosts (json) {
    let validJson;
    try{
      validJson = JSON.parse(JSON.stringify(json));
    } catch(error) {
      throw error;
    }
    return validJson;
  }

  // saves the file to localstorage
  savePosts(posts) {
    const validJson = this.validatePosts(posts);

    if (!validJson) {
      return alert('Data can not be stored!');
    } else {
      window.localStorage.setItem(
        this.LOCALSTORAGE_KEY,
        JSON.stringify(validJson)
      );
    }
  }
  // Selects the unique posts by type removing redundancy
  unique() {
    this.setState({
      filter: this.state.posts.map((post) => post.type).filter((value, index, self) => self.indexOf(value) === index),
    })
  }

  // Sorts posts ascending
  ascending(event) {
    event.preventDefault();
    this.setState({
      filtered: this.state.filtered.sort((a, b) => a.name.localeCompare(b.name))
    });
  }

  // Sorts posts descending
  descending(event) {
    event.preventDefault();
    this.setState({
      filtered: this.state.filtered.sort((a, b) => b.name.localeCompare(a.name))
    });
  }

  // Filters posts based type
  filter(event) {
    event.preventDefault();
    this.setState({
      filtered: this.state.posts.filter((a) => a.type === event.target.value)
    })
  }

  // Remove the selected post from storage
  remove(event) {
    event.preventDefault();
    let newPosts = this.state.posts.filter((post) => post.name !== event.target.value);
    this.savePosts(newPosts);
    this.loadPosts();
  }

  // Changes the page on click
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  UNSAFE_componentWillMount() {
    this.savePosts(Posts);
    this.loadPosts();
  }

  render() {
    // const { filtered, currentPage, postsPerPage } = this.state;

    // Logic for displaying posts
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.filtered.slice(indexOfFirstPost, indexOfLastPost);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.filtered.length / this.state.postsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number, index) => {
      return (
        <Pagination.Item 
          active={number === this.state.currentPage}
          id={number}
          onClick={this.handleClick}
          key={index}
          >
          {number}
        </Pagination.Item>
      );
    });
    return (
      <div className="container">
        <div className="row">
        <h1>Purple Wifi Test</h1>
          <div className="col-sm-4">
            <button onClick={this.ascending} type="button" className="btn btn-primary">Sort Ascending</button>
          </div>
          <div className="col-sm-4">
            <button onClick={this.descending} type="button" className="btn btn-primary" >Descending</button>
          </div>
          <div className="col-sm-4">
            <select id="filter" className="form-control" onChange={this.filter} >
              <option>--Select--</option>
              {
                this.state.filter.map((unique, index) => {
                  return <option value={unique} key={index}>{unique}</option>
                })
              }
            </select>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8">
            {
              currentPosts.map((post, index) => {
                return <div key={`post-list-key ${index}`}>
                  <PostDetail post={post} />
                  <button type="btn" onClick={this.remove} className="btn btn-danger" value={post.name}>Delete</button>
                </div>
              })
            }
          </div>
        </div>
        <div className="row">
          <div className="col-8">
           <Pagination bsSize="medium">{renderPageNumbers}</Pagination>
          </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-10">
              <PostForm filter={this.state.filter} LOCALSTORAGE_KEY={this.LOCALSTORAGE_KEY} loadPosts={this.loadPosts}/>
            </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default PostList;
