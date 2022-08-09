import { combineReducers } from "redux";

import { locationReducer } from "./location/location.reducer";
import { signUpReducer } from "./signup/signup.reducer";

export const rootReducer = combineReducers({
  location: locationReducer,
  signup: signUpReducer,
});
