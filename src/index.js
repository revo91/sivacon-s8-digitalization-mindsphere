import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer } from './reducer/index';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';

import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: red,
    }
  });
  
const store = createStore(reducer)

ReactDOM.render(<Provider store={store}><MuiThemeProvider theme={theme}><App /></MuiThemeProvider></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
