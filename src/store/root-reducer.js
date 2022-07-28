import { combineReducers } from "redux";

import { locationReducer } from "./location/location.reducer";

export const rootReducer = combineReducers({
  location: locationReducer,
});
