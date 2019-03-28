// modules
import { createSelector } from 'reselect';

const calendar = state => state.calendar;

export const calendar$ = createSelector(
  calendar,
  calendar => calendar
);

export const dialogs$ = state => state.dialogs;

export const user$ = state => state.user;

export const userName$ = createSelector(
  user$,
  user => user.userName
);

export const token$ = createSelector(
  user$,
  user => user.token
);
