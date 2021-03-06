import React, { Component } from "react";
import { connect } from "react-redux";
import PollBrief from "./PollBrief";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

class PollList extends Component {
  state = {
    list: "unanswered",
  };

  handleChange = (e) => {
    e.preventDefault();
    const list = e.target.value;
    console.log(list);
    this.setState(() => ({
      list,
    }));
  };

  render() {
    console.log(this.props.unansweredIdList);
    console.log(this.props.answeredIdList);
    return (
      <div className="Box1">
        <div className="Box2">
          <div className="viewQList">
            <ButtonGroup size="lg">
              <Button
                variant="outline-info"
                type="submit"
                value="unanswered"
                onClick={this.handleChange}
              >
                Unanswered Questions
              </Button>
              <Button
                variant="outline-info"
                type="submit"
                value="answered"
                onClick={this.handleChange}
              >
                Answered Questions
              </Button>
            </ButtonGroup>
          </div>
          {this.state.list === "unanswered"
            ? this.props.unansweredIdList.map((id) => (
                <PollBrief key={id} id={id} />
              ))
            : this.props.answeredIdList.map((id) => (
                <PollBrief key={id} id={id} />
              ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const answeredIdList = Object.keys(users[authedUser].answers);
  const unansweredIdList = Object.keys(questions).filter(
    (id) => !answeredIdList.includes(id)
  );
  return {
    answeredIdList: answeredIdList.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    unansweredIdList: unansweredIdList.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(PollList);
