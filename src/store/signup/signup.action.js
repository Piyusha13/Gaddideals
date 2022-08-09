import { SIGNUP_ACTION_TYPES } from "./signup.types";
import { createAction } from "../../utils/reducer.util";

export const setSignUpValue = (bool) =>
  createAction(SIGNUP_ACTION_TYPES.SET_SIGNUP_BOOL, bool);

export const setMobSignInValue = (bool) =>
  createAction(SIGNUP_ACTION_TYPES.SET_MOB_SIGNIN_BOOL, bool);
