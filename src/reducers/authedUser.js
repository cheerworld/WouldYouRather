import { SET_AUTHED_USER, DELETE_AUTHEDUSER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    case DELETE_AUTHEDUSER:
      return null;
    default:
      return state;
  }
}
