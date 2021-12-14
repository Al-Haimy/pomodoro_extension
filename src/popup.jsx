import React from "react";
import { render } from "react-dom";
import Popup from "./components/Popup";
import "./style.css";

window.addEventListener("DOMContentLoaded", (event) => {
  render(<Popup />, document.getElementById("popup"));
});
