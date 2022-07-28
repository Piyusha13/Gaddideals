import { LOCATION_ACTION_TYPES } from "./location.types";

const INITIAL_STATE = {
  currentCity: "",
};

export const locationReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOCATION_ACTION_TYPES.SET_CURRENT_CITY:
      return { ...state, currentCity: payload };

    default:
      return state;
  }
};
