import { combineReducers } from 'redux';
import { drawerReducer } from './drawerReducer';
import { chartReducer } from './chartReducer';
import { switchesStateReducer } from './switchesStateReducer';
import { dialogReducer } from './dialogReducer';
import { languageDialogReducer } from './languageDialogReducer';

export default combineReducers({
  drawerReducer,
    chartReducer,
    switchesStateReducer,
    dialogReducer,
    languageDialogReducer
  });
  