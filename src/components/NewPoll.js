import React, { Component } from "react";
import { connect } from "react-redux";
import { addPollToStore } from "../actions/shared";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class NewPoll extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
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
    console.log(this.props);
    const { optionOne, optionTwo } = this.state;
    const { authedUser, dispatch, history } = this.props;
    dispatch(
      addPollToStore({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser,
      })
    );
    history.push("/");
  };

  render() {
    const { optionOne, optionTwo } = this.state;
    const option1Left = 70 - optionOne.length;
    const option2Left = 70 - optionTwo.length;
    return (
      <div className="Box1">
        <Card border="info" style={{ border: "2px solid", width: "500px" }}>
          <Card.Header className="text-center" as="h3">
            Create New Question
          </Card.Header>
          <Card.Body>
            <Card.Text>Complete the question:</Card.Text>
            <Card.Title as="h4">Would you rather...</Card.Title>
            <Form.Group
              as="form"
              className="addPoll"
              onSubmit={this.handleSubmit}
            >
              <Form.Control
                type="text"
                name="optionOne"
                placeholder="Enter option one text here"
                value={optionOne}
                onChange={this.handleChange}
                maxLength={70}
              />
              {option1Left <= 10 && (
                <Form.Text className="option-length">{option1Left}</Form.Text>
              )}
              <Card.Text as="h5" className="text-center or">
                Or
              </Card.Text>
              <Form.Control
                type="text"
                name="optionTwo"
                placeholder="Enter option two text here"
                value={optionTwo}
                onChange={this.handleChange}
                maxLength={70}
              />

              {option2Left <= 10 && (
                <Form.Text className="option-length">{option2Left}</Form.Text>
              )}
              <Button
                block
                variant="success"
                type="submit"
                disabled={optionOne === "" || optionTwo === ""}
                className="marginTopBtn"
              >
                Submit
              </Button>
            </Form.Group>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(NewPoll);
