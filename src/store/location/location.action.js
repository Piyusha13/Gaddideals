import { LOCATION_ACTION_TYPES } from "./location.types";
import { createAction } from "../../utils/reducer.util";

export const setCurrentCity = (city) =>
  createAction(LOCATION_ACTION_TYPES.SET_CURRENT_CITY, city);
