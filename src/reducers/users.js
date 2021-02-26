import { GET_USERS, SAVE_USER_ANSWER } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case SAVE_USER_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    default:
      return state;
  }
}
