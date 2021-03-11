import React, { Component } from "react";
import { connect } from "react-redux";
import AnsweredPoll from "./AnsweredPoll";
import UnansweredPoll from "./UnansweredPoll";
import ErrorPage404 from "./ErrorPage404";
import PropTypes from "prop-types";

class Poll extends Component {
  render() {
    //console.log(this.props);
    const { userVoteOrNot, id, questions } = this.props;
    if (!questions[id]) {
      return <ErrorPage404 />;
    }
    return (
      <div className="Box1">
        {userVoteOrNot ? <AnsweredPoll id={id} /> : <UnansweredPoll id={id} />}
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, props) {
  const id = props.match.params.question_id;
  const userAnsweredPoll = Object.keys(users[authedUser].answers);
  const userVoteOrNot = userAnsweredPoll.includes(id);

  return {
    id,
    questions,
    userVoteOrNot,
  };
}

Poll.propTypes = {
  id: PropTypes.string.isRequired,
  questions: PropTypes.object.isRequired,
  userVoteOrNot: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(Poll);
