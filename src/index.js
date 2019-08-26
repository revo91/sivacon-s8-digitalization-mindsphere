import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "typeface-roboto";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import red from "@material-ui/core/colors/red";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { SnackbarProvider } from "notistack";
//i18n
import "./i18n";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#055f87" },
    secondary: red
  }
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1}>
        <App />
      </SnackbarProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//Test comment
