import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {

    window.login = api_util.login;										#used for browser testing
    window.logout = api_util.logout;


    const root = document.getElementById("root");
    ReactDOM.render(<h1>Hello React!</h1>, root);
});