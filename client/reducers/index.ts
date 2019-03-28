// modules
import { combineReducers } from 'redux';

// reducers
import { calendarReducer as calendar } from './calendar';
import { dialogsReducer as dialogs } from './dialogs';
import { userReducer as user } from './user';

export default combineReducers({
  calendar,
  dialogs,
  user
});
