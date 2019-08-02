import { combineReducers } from 'redux';
import { drawerReducer } from './drawerReducer';
import { chartReducer } from './chartReducer';
import { switchesStateReducer } from './switchesStateReducer';
import { dialogReducer } from './dialogReducer';

export default combineReducers({
  drawerReducer,
    chartReducer,
    switchesStateReducer,
    dialogReducer
  });
  