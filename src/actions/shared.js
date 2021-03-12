import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
  checkUserPassword,
} from "../_DATA.js";

import { getQuestions, saveQuestion, addQuestion } from "./questions";
import { getUsers, saveUserAnswer, addPollToUser } from "./users";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => {
        dispatch(getQuestions(questions));
        dispatch(getUsers(users));
        dispatch(hideLoading());
      })
      .catch((e) => {
        dispatch(hideLoading());
        console.warn("Error in handleInitialData: ", e);
        alert("There was an error in handling Initial Data. Try again.");
      });
  };
}

export function savePollAnswer(info) {
  return (dispatch) => {
    dispatch(saveQuestion(info));
    dispatch(saveUserAnswer(info));
    dispatch(showLoading());
    return _saveQuestionAnswer(info)
    .then(() => dispatch(hideLoading()))
    .catch((e) => {
      dispatch(hideLoading());
      console.warn("Error in savePollAnswer: ", e);
      alert("There was an error in saving poll answer. Try again.");
    });
  };
}

export function addPollToStore(info) {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestion(info)
      .then((poll) => {
        dispatch(addQuestion(poll));
        dispatch(addPollToUser(poll));
        dispatch(hideLoading());
      })
      .catch((e) => {
        dispatch(hideLoading());
        console.warn("Error in addPollToStore: ", e);
        alert("There was an error in adding poll to store. Try again.");
      });
  };
}

export function handleCheckUserPassword (user, password) {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(showLoading("autheticating"));
    return checkUserPassword(user, password)
    .then(() => {
      console.log("matches");
      dispatch(setAuthedUser(user));
      dispatch(hideLoading());
      dispatch(hideLoading("autheticating"));
    })
    .catch(() => {
      dispatch(hideLoading());
      dispatch(hideLoading("autheticating"));
      console.log("fails");
      alert("Wrong password, please try again!");
    });
  };
}
