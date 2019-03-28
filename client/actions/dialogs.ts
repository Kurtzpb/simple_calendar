// dialog types
export const ADD_EVENT_DIALOG = 'addEventDialog';
export const ALERT_DIALOG = 'alertDialog';
export const CONFIRM_DIALOG = 'confirmDialog';

export const toggleDialog = (dialog, flag, message = '') => ({
  type: dialog,
  flag,
  message
});
