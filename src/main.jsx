import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import FireBaseContext from "./context/firebase";
import { firebaseApp, value } from "./lib/firebase";
import { RecoilRoot } from "recoil";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <FireBaseContext.Provider value={{ firebaseApp, value }}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </FireBaseContext.Provider>,
  document.getElementById("root")
);
