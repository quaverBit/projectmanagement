import React, { Component } from 'react';
import {
  Button,
  Form,
  FormControl,
  Navbar,
} from 'react-bootstrap';

import { userLogin, userSignup } from '../services/auth';

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: '',
      }
    }
  }

  signup = () => {
    userSignup(this.state.data);
  };
  
  login = () => {
    userLogin(this.state.data);
  };

  onChangeHandler = fieldName => (
    (evt) => {
      const toUpdate = Object.assign({}, this.state.data);
      toUpdate[fieldName] = evt.target.value;
      this.setState({ data: toUpdate });
    }
  )

  render() {
    return (
      <Navbar className="bg-light justify-content-between">
        <Form inline>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={this.state.data.username}
              onChange={this.onChangeHandler('username')}
            />
            <FormControl
              type="password"
              placeholder="Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              value={this.state.data.password}
              onChange={this.onChangeHandler('password')}
            />
            <Button onClick={this.signup}>Signup</Button>
            <Button onClick={this.login}>Login</Button>
        </Form>
      </Navbar>
    )}
}