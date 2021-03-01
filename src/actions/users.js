export const GET_USERS = "GET_USERS";
export const SAVE_USER_ANSWER = "SAVE_USER_ANSWER";
export const ADD_POLL_TO_USER = "ADD_POLL_TO_USER";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function saveUserAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_USER_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function addPollToUser(poll) {
  return {
    type: ADD_POLL_TO_USER,
    poll,
  };
}
