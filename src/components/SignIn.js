import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { checkUserPassword } from "../_DATA.js";

class SignIn extends Component {
  state = {
    value: "select",
    password: "",
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
    console.log(this.state.password);
    const {value, password} = this.state;
    const { dispatch } = this.props;
    this.setState({
      value: "select",
      password: "", 
    });
    checkUserPassword(value, password)
    .then(() => {
      console.log("matches");
      dispatch(setAuthedUser(value));
    })
    .catch(() => {
      console.log("fails");
      alert("Wrong password, please try again!");
    })
  };

  render() {
    const { users, usersId } = this.props;
    console.log(this.props);
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
            Sign In
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
