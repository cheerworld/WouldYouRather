import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SignIn extends Component {
  state = {
    value: "select",
  };

  handleChange = (e) => {
    const value = e.target.value;

    this.setState(() => ({
      value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const authedUser = this.state.value;
    const { dispatch } = this.props;
    this.setState({ value: "select" });

    dispatch(setAuthedUser(authedUser));
  };

  render() {
    const users = this.props.usersId;
    console.log(users);
    return (
      <div className="Box1">
        <Form as="form" className="Box2" onSubmit={this.handleSubmit}>
          <h3>Welcome to Would You Rather App</h3>
          <p>Please sign in to continue</p>
          <Form.Group controlId="Select">
            <Form.Label as="h3">Sign In</Form.Label>
            <Form.Control
              as="select"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option disabled value="select" hidden>
                Select user
              </option>
              {users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            disabled={this.state.value === "select"}
          >
            Sign In
          </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    usersId: Object.keys(users),
  };
}

export default connect(mapStateToProps)(SignIn);
