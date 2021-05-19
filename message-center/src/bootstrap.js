import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
