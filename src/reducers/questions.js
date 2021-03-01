import {
  GET_QUESTIONS,
  SAVE_QUESTION,
  ADD_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return action.questions;
    case SAVE_QUESTION:
      const { authedUser, qid, answer } = action;
      console.log(authedUser, qid, answer);
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
