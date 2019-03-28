// modules
import * as moment from 'moment';

// action types
import { UPDATE_EVENTS } from '../actions/calendar';

// types
import { DayType, EventType } from '../types';

interface CalendarState<DayType> {
  [key: string]: Array<EventType>;
}

const initialState: CalendarState<DayType> = {
  [moment().format('MMM Do YY')]: []
};

export const calendarReducer = (
  state: CalendarState<DayType> = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_EVENTS:
      return {
        ...state,
        [moment().format('MMM Do YY')]: [...action.payload]
      } as CalendarState<DayType>;
    default:
      return state as CalendarState<DayType>;
  }
};
