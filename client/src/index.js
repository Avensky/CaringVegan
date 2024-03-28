import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar as faStarBorder,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";

import {
  fab,
  faFacebook,
  faGooglePlus,
  faInstagram,
  faTiktok,
  faYoutube,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";

import {
  faCheckSquare,
  faCoffee,
  faUser,
  faCartShopping,
  //faBagShopping,
  faMagnifyingGlass,
  faHeart,
  faBars,
  faStar,
  faTrashCan,
  faMinus,
  faPlus,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faSignIn,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faUser,
  faCartShopping,
  //faBagShopping,
  faMagnifyingGlass,
  faHeart,
  faBars,
  faStar,
  faStarHalfStroke,
  faStarBorder,
  faTrashCan,
  faPlus,
  faMinus,
  faEye,
  faEyeSlash,
  faFacebook,
  faInstagram,
  faGooglePlus,
  faTiktok,
  faArrowLeft,
  faYoutube,
  faSquareYoutube,
  faSignIn,
  faUserPlus
);

const app = (
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
