import React, { Component } from "react";
import { connect } from "react-redux";
import UserScore from "./UserScore";
import "../CSS/LeaderBoard.css";
import PropTypes from "prop-types";

class LeaderBoard extends Component {
  render() {
    //console.log(this.props);
    return (
      <div className="leaderBoard">
        <div className="score">
          {this.props.ids.map((id) => (
            <UserScore key={id} id={id} />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    ids: Object.keys(users).sort(
      (a, b) =>
        Object.keys(users[b].answers).length +
        users[b].questions.length -
        (Object.keys(users[a].answers).length + users[a].questions.length)
    ),
  };
}

LeaderBoard.propTypes = {
  ids: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(LeaderBoard);
