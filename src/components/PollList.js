import React, { Component } from "react";
import { connect } from "react-redux";
import PollBrief from "./PollBrief";

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
      <div>
        <button type="submit" value="unanswered" onClick={this.handleChange}>
          Unanswered Questions
        </button>
        <button type="submit" value="answered" onClick={this.handleChange}>
          Answered Questions
        </button>
        {this.state.list === "unanswered"
          ? this.props.unansweredIdList.map((id) => (
              <PollBrief key={id} id={id} />
            ))
          : this.props.answeredIdList.map((id) => (
              <PollBrief key={id} id={id} />
            ))}
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const answeredIdList = Object.keys(users[authedUser].answers);
  return {
    answeredIdList,
    unansweredIdList: Object.keys(questions).filter(
      (id) => !answeredIdList.includes(id)
    ),
  };
}
export default connect(mapStateToProps)(PollList);
