// API
import Api from '../api';

// utils
import { getToken, formatEvents } from '../utils';

// actions
import { toggleDialog, ALERT_DIALOG } from './dialogs';
import { logout } from './user';

// export action types
export const UPDATE_EVENTS = 'UPDATE_EVENTS';

export const updateEvents = payload => ({
  type: UPDATE_EVENTS,
  payload
});

export const getEvents = () => async dispatch => {
  const token = getToken();
  const { data, error } = await new Api({ token }).getEvents();

  if (error) {
    dispatch(toggleDialog(ALERT_DIALOG, true, error));
    dispatch(logout());
    return null;
  }

  const events = formatEvents(data);

  dispatch(updateEvents(events));
};

export const addEvent = event => async dispatch => {
  const token = getToken();
  const { data, error } = await new Api({ token }).addEvent(event);

  if (error) {
    dispatch(toggleDialog(ALERT_DIALOG, true, error));
    dispatch(logout());
    return null;
  }

  const events = formatEvents(data);

  dispatch(updateEvents(events));
};

export const deleteEvent = id => async dispatch => {
  const token = getToken();
  const { data, error } = await new Api({ token }).deleteEvent(id);

  if (error) {
    dispatch(toggleDialog(ALERT_DIALOG, true, error));
    dispatch(logout());
    return null;
  }

  const events = formatEvents(data);

  dispatch(updateEvents(events));
};
