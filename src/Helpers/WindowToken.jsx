import { isAuth, authToken } from "./AuthToken";
const init = () => {
  let w = window;
  let status = false;
  w.axios = require("axios");
  if (isAuth) {
    w.axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
    status = true;
  } else {
    status = false;
  }
  return status ? "success" : "failed";
};
export default init;