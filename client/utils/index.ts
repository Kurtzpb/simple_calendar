// modules
import * as moment from 'moment';
import _ from 'lodash';

// constants
import { stylesConstants, dayLength } from '../constants';

// types
import { CalculatedStyles, EventType } from '../types';

/** method that calculates time intervals
 * @param {start} - takes start of parent interval
 * @param {end} - takes end of parent interval
 * @return {Array} - array of time intervals
 */
export const calculateTimeIntervals = (start, end) => {
  const startTime = moment(start, 'HH:mm');
  const endTime = moment(end, 'HH:mm');

  const result = [];

  while (startTime <= endTime) {
    result.push(startTime.format('HH:mm'));
    startTime.add(30, 'minutes');
  }

  return result;
};

/** method that calculates event's top or heihth
 * @param {start} - takes time of event's start
 * @param {end} - takes time of event's end
 * @return {number} - interval of heigth
 */
export const calculateEventTopAndHeigth = (start, end): number =>
  moment(end, 'HH:mm').diff(moment(start, 'HH:mm'), 'minutes') * 2;

/** method that calculates range conflicts
 * @param {timeStart} - takes time of interval's start
 * @param {timeEnd} - takes time of interval's end
 * @param {checkedTime} - takes time that should be checked on range conflict
 * @return {boolean} - interval of heigth
 */
export const checkRangeConflicts = (
  { timeStart, timeEnd },
  checkedTime
): boolean =>
  moment(checkedTime, 'HH:mm').isBetween(
    moment(timeStart, 'HH:mm'),
    moment(timeEnd, 'HH:mm')
  );

/** method that calculates events position
 * @param {events} - array of related events
 * @return {Array} - calculated styles of width and left position
 */
export const calculateEventsPosition = (events): Array<CalculatedStyles> => {
  const styles = [];

  const sorted = events.sort(
    (prev, next) =>
      (moment(prev.timeStart, 'HH:mm') as any) -
      (moment(next.timeStart, 'HH:mm') as any)
  );

  sorted.forEach(event => {
    if (!styles.find(style => style.id === event.id)) {
      const { timeStart, timeEnd } = event;
      const conflictedEvents = events.filter(
        e =>
          checkRangeConflicts({ timeStart, timeEnd }, e.timeStart) ||
          checkRangeConflicts({ timeStart, timeEnd }, e.timeEnd) ||
          (moment(timeStart, 'HH:mm').isSame(moment(e.timeStart, 'HH:mm')) &&
            moment(timeEnd, 'HH:mm').isSame(moment(e.timeEnd, 'HH:mm')))
      );

      conflictedEvents.forEach(({ id }, idx) => {
        const { eventWidth, eventsLayoutLeftMargin } = stylesConstants;

        const left = `${
          idx
            ? (eventWidth / conflictedEvents.length) * idx +
              eventsLayoutLeftMargin
            : eventsLayoutLeftMargin
        }px`;
        const style = {
          id,
          left,
          width: `${eventWidth / conflictedEvents.length}px`
        };

        styles.push(style);
      });
    }
  });

  return styles;
};

/** method that check authentication
 * @return {string | undefined} - token or undefined
 */
export const getToken = (): string | undefined =>
  document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');

/** method that validates password
 * @return {any} - validation result
 */
export const passwordValidation = (password: string): any =>
  password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/);

/** method that validates username
 * @return {any} - validation result
 */
export const usernameValidation = (userName: string): any =>
  userName.match(/^[A-Za-z]\w{3,9}$/);

/** method that format events after server response
 * @param {events} - server responsed events
 * @return {Array<EventType>} - array of formatted events
 */
export const formatEvents = (events: any): Array<EventType> =>
  events.map(event => {
    const formEvent = { ...event, id: event._id };
    delete formEvent._id;
    return formEvent;
  });

/** method that calculates events before export to JSON file
 * @param {Array<EventType>}
 * @return - array of calculated data
 */
export const prepareDataToExport = (events: Array<EventType>): any => {
  const { from } = dayLength;

  return events.map(event => {
    const { timeStart, timeEnd, title } = event;
    const start = moment
      .duration(moment(timeStart, 'HH:mm').diff(moment(from, 'HH:mm')))
      .asMinutes();
    const duration = moment
      .duration(moment(timeEnd, 'HH:mm').diff(moment(timeStart, 'HH:mm')))
      .asMinutes();

    return {
      start,
      duration,
      title
    };
  });
};
