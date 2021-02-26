import { GET_QUESTIONS, SAVE_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return action.questions;
    case SAVE_QUESTION:
      const { authedUser, qid, answer } = action;
      console.log(authedUser, qid, answer);
      return {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      };
    default:
      return state;
  }
}
