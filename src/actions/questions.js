export const GET_QUESTIONS = "GET_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function saveQuestion({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}
