import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Radio, HelpBlock, Button } from 'react-bootstrap';

class PostForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.LOCALSTORAGE_KEY = this.props.LOCALSTORAGE_KEY;
    this.loadPosts = this.props.loadPosts;
    this.save = this.save.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.state = {
      name: '',
      type: '',
      chartType: '',
      validForm: true,
      frequency: '',
      active: '',
      filterTypes: []
    };
  }

  handleChange(event) {
    switch (event.target.id) {
      case "name":
        this.setState({
          name: event.target.value,
          validForm: (event.target.valid === "success") ? false : true
        });

        break;
      case "type":
        this.setState({
          type: event.target.value,
          validForm: (event.target.valid === "success") ? false : true
        });
        break;
      case "chartType":
        this.setState({
          chartType: event.target.value,
          validForm: (event.target.valid === "success") ? false : true
        });
        break;
      case "frequency":
        this.setState({
          frequency: event.target.value,
          validForm: (event.target.valid === "success") ? false : true
        });
        break;
      case "filterTypes":
        let allOptions = event.target.options;
        let filterTypes = [];
        for (let i = 0; i < allOptions.length; i++) {
          if (allOptions[i].selected) {
            filterTypes.push(allOptions[i].value);
          }
        }
        this.setState({
          filterTypes: filterTypes,
          validForm: (event.target.valid === "success") ? false : true
        });
        break;
      case "active":
        console.log('here');
        this.setState({
          active: event.target.value,
          validForm: (event.target.valid === "success") ? false : true
        });
        break;
      default:
        break;
    }
  }

  save(event) {
    event.preventDefault();
    const { name, type, chartType, frequency, active, filterTypes } = this.state;
    let newPost = { name, type, chartType, frequency, active, filterTypes };
    let posts = JSON.parse(window.localStorage.getItem(this.LOCALSTORAGE_KEY));
    posts.push(newPost);
    if (this.state.validForm) {
      window.localStorage.setItem(
        this.LOCALSTORAGE_KEY,
        JSON.stringify(posts)
      );
      this.loadPosts();
    } else {
      return alert('Some fields are empty');
    }
  }
  getValidationState(value) {
    if (value.length < 1) {
      return 'error';
    } else if (value.length > 0) {
      return 'success';
    }
  }
  render() {
    function FieldGroup({ id, label, valid, help, ...props }) {
      return (
        <FormGroup controlId={id} validationState={valid}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          <FormControl.Feedback />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      )
    }

    return (
      <form onSubmit={this.save}>
        <h1>Add a New Post</h1>
        <FieldGroup
          id="name"
          label="Name"
          type="text"
          value={this.state.name}
          placeholder="Enter Name"
          valid={this.getValidationState(this.state.name)}
          onChange={this.handleChange}
        />
        <FieldGroup
          id="type"
          type="text"
          label="Type"
          placeholder="Enter Type"
          value={this.state.type}
          valid={this.getValidationState(this.state.type)}
          onChange={this.handleChange}
        />
        <FieldGroup
          id="chartType"
          type="text"
          label="Chart Type"
          placeholder="Enter Chart Type"
          value={this.state.chartType}
          valid={this.getValidationState(this.state.chartType)}
          onChange={this.handleChange}
        />
        <FormGroup onChange={this.handleChange}>
          <ControlLabel>Filter Type</ControlLabel>
          <FormControl componentClass="select" id="filterTypes" multiple>
            <option>select (multiple)</option>
            <option value="Location">Location</option>
            <option value="Age Range">Age Range</option>
          </FormControl>
        </FormGroup>
        <FieldGroup
          id="frequency"
          type="text"
          label="Frequency"
          placeholder="Enter Frequency"
          value={this.state.frequency}
          onChange={this.handleChange}
        />
        <FormGroup id="active" onChange={this.handleChange}>
          <ControlLabel>Active</ControlLabel>{' '}
          <br />          
          <Radio name="active1" inline>
            True
          </Radio>{' '}
          <Radio name="active1" inline>
            False
          </Radio>
        </FormGroup>
        <Button type="submit" className="btn btn-success">Submit</Button>
      </form>
    );
  }
}

export default PostForm;