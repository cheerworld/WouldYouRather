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

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function addPollToStore(info) {
  return (dispatch) => {
    dispatch(addQuestion(formatQuestion(info)));
    dispatch(addPollToUser(formatQuestion(info)));
    return _saveQuestion(info)
      .catch((e) => {
        console.warn("Error in addPollToStore: ", e);
        alert("There was an error in adding poll to store. Try again.");
      });
  };
}
