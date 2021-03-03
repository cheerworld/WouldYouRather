export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const DELETE_AUTHEDUSER = "DELETE_AUTHEDUSER";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function deleteAuthedUser() {
  return {
    type: DELETE_AUTHEDUSER,
  }
}
