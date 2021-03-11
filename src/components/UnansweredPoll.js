import React, { Component } from "react";
import { connect } from "react-redux";
import { savePollAnswer } from "../actions/shared";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class UnansweredPoll extends Component {
  state = {
    option: null,
  };

  handleChange = (e) => {
    const option = e.target.value;
    this.setState(() => ({
      option,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const option = this.state.option;

    const { authedUser, id } = this.props;
    this.props.dispatch(
      savePollAnswer({
        authedUser,
        qid: id,
        answer: option,
      })
    );
  };

  render() {
    //console.log(this.props);
    const { name, avatar, option1, option2 } = this.props.poll;
    return (
      <Card border="info" style={{ border: "2px solid" }}>
        <Card.Header as="h4">{name} asks: </Card.Header>
        <Card.Body className="pollBrief">
          <div className="leftCenter">
            <Card.Img src={avatar} alt={name} className="pollAvatar" />
          </div>
          <div className="right">
            <Card.Title as="h4">Would you rather...</Card.Title>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Check
                  as="input"
                  type="radio"
                  value="optionOne"
                  checked={this.state.option === "optionOne"}
                  onChange={this.handleChange}
                  label={option1}
                />
                <Form.Check
                  as="input"
                  type="radio"
                  value="optionTwo"
                  checked={this.state.option === "optionTwo"}
                  onChange={this.handleChange}
                  label={option2}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const name = users[questions[id].author].name;
  const avatar = users[questions[id].author].avatarURL;
  const option1 = questions[id].optionOne.text;
  const option2 = questions[id].optionTwo.text;
  return {
    authedUser,
    poll: {
      name,
      avatar,
      option1,
      option2,
    },
  };
}

UnansweredPoll.propTypes = {
  id: PropTypes.string.isRequired,
  authedUser: PropTypes.string.isRequired,
  poll: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(UnansweredPoll);
