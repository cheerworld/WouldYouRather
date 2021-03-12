import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCheckUserPassword } from "../actions/shared";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Spinner from 'react-bootstrap/Spinner';

class SignIn extends Component {
  state = {
    value: "select",
    password: "",
    load: false,
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {value, password} = this.state;
    this.setState({
      value: "select",
      password: "",
      load: true,
    });
    this.props.dispatch(handleCheckUserPassword(value, password))
      .then(() => this.setState({load: false}));
  };

  render() {
    const { users, usersId } = this.props;
    //console.log(this.props);
    return (
      <div className="Box1">
        <Form as="form" className="Box2" onSubmit={this.handleSubmit}>
          <h3>Welcome to Would You Rather App</h3>
          <p>Please sign in to continue</p>
          <Form.Group>
            <Form.Label as="h3">Sign In</Form.Label>
            <Form.Control
              as="select"
              name="value"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option disabled value="select" hidden>
                Select user
              </option>
              {usersId.map((user) => {
                return (
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            disabled={this.state.value === "select" || this.state.password === ""}
          >
          {this.state.load === true
            ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
               />
            )
            : null}
            {this.state.load === false ? "Sign In" : " Loading"}
          </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    usersId: Object.keys(users),
    users,
  };
}

SignIn.propTypes = {
  usersId: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(SignIn);
