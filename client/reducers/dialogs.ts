// dialog types
import {
  ADD_EVENT_DIALOG,
  ALERT_DIALOG,
  CONFIRM_DIALOG
} from '../actions/dialogs';

interface DialogsState {
  message?: string;
  [ADD_EVENT_DIALOG]: boolean;
  [ALERT_DIALOG]: boolean;
  [CONFIRM_DIALOG]: boolean;
}

const initialState: DialogsState = {
  message: '',
  [ADD_EVENT_DIALOG]: false,
  [ALERT_DIALOG]: false,
  [CONFIRM_DIALOG]: false
};

export const dialogsReducer = (state: DialogsState = initialState, action) => {
  const { type, flag, message } = action;

  if (message) {
    return {
      ...state,
      [type]: flag,
      message
    };
  }
  return { ...state, [type]: flag };
};
