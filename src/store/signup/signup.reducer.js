import { SIGNUP_ACTION_TYPES } from "./signup.types";

const INITIAL_STATE = {
  displaySignIn: false,
  mobDisplaySignIn: false,
};

export const signUpReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_ACTION_TYPES.SET_SIGNUP_BOOL:
      return { ...state, displaySignIn: payload };

    case SIGNUP_ACTION_TYPES.SET_MOB_SIGNIN_BOOL:
      return { ...state, mobDisplaySignIn: payload };
    default:
      return state;
  }
};
