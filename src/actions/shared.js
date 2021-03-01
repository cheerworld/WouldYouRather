import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from "../_DATA.js";

import { getQuestions, saveQuestion, addQuestion } from "./questions";
import { getUsers, saveUserAnswer, addPollToUser } from "./users";

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => {
        dispatch(getQuestions(questions));
        dispatch(getUsers(users));
      })
      .catch((e) => {
        console.warn("Error in handleInitialData: ", e);
        alert("There was an error in handling Initial Data. Try again.");
      });
  };
}

export function savePollAnswer(info) {
  return (dispatch) => {
    dispatch(saveQuestion(info));
    dispatch(saveUserAnswer(info));
    return _saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in savePollAnswer: ", e);
      alert("There was an error in saving poll answer. Try again.");
    });
  };
}

export function addPollToStore(info) {
  return (dispatch) => {
    return _saveQuestion(info)
      .then((poll) => {
        console.log(poll);
        dispatch(addQuestion(poll));
        dispatch(addPollToUser(poll));
      })
      .catch((e) => {
        console.warn("Error in addPollToStore: ", e);
        alert("There was an error in adding poll to store. Try again.");
      });
  };
}
