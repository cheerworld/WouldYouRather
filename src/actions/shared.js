import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
} from "../_DATA.js"

import { getQuestions } from "./questions";
import { getUsers } from "./users";

export function handleInitialData () {
  return (dispatch) => {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => {
      dispatch(getQuestions(questions));
      dispatch(getUsers(users));
    })
    .catch((e) => {
      console.log(e);
    })
  }
}

export function savePollAnswer ({ authedUser, qid, answer }) {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid, answer })
      .catch(e=>console.log(e));
  }
}
