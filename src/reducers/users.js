import {
  GET_USERS,
  SAVE_USER_ANSWER,
  ADD_POLL_TO_USER,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case SAVE_USER_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    case ADD_POLL_TO_USER:
      const { author, id } = action.poll;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id]),
        },
      };
    default:
      return state;
  }
}
