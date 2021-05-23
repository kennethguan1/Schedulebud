import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from "./components/root";
import * as api_util from './util/location_api_util'; 


document.addEventListener("DOMContentLoaded", () => {

    window.fetchLocation = api_util.fetchLocation;
    window.fetchLocations = api_util.fetchLocations;

    const preloadedState = {};
    let store = configureStore(preloadedState);

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
});