// modules
import * as React from 'react';
import _ from 'lodash';

// types
import { EventType } from '../../../types';

// constants
import { dayLength, stylesConstants } from '../../../constants';

// utils
import {
  calculateTimeIntervals,
  calculateEventsPosition
} from '../../../utils';

// components
import Event from '../event';

type StyleType = React.CSSProperties;

const { layoutWidth, layoutItemHeigth } = stylesConstants;

const styles = {
  layout: {
    position: 'absolute',
    width: `${layoutWidth}px`,
    fontFamily: 'Open Sans'
  } as StyleType,
  layoutItem: {
    height: `${layoutItemHeigth}px`,
    fontWeight: 200
  } as StyleType,
  eventsLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  } as StyleType
};

interface DayProps {
  // events
  events: Array<EventType>;
  // removing event
  deleteEvent: (id: string) => void;
  // dialogs
  dialogs: any;
  // method toggles dialogs
  toggleDialog: (dialogType: string, flag: boolean, message: string) => void;
}

export class Day extends React.PureComponent<DayProps> {
  static defaultProps = {
    events: [] as Array<EventType>
  };

  public render() {
    return (
      <div style={styles.layout}>
        {this.renderEvents()}
        {this.renderDayLayout()}
      </div>
    );
  }

  /** method that renders day's layout
   * @return {JSX.Element}
   */
  private renderDayLayout = (): JSX.Element => {
    const { from, to } = dayLength;

    const timeIntervals = calculateTimeIntervals(from, to);

    return (
      <div style={styles.layout}>
        {timeIntervals.map((time: string, idx: number) => (
          <div
            style={{
              ...styles.layoutItem,
              fontSize: idx % 2 ? '12px' : '16px',
              borderTop: !(idx % 2) ? '1px solid lightgrey' : ''
            }}
            key={time}
          >
            {time}
          </div>
        ))}
      </div>
    );
  };

  /** method that renders events
   * @return {JSX.Element}
   */
  private renderEvents = (): JSX.Element => {
    const { events, deleteEvent, dialogs, toggleDialog } = this.props;
    const calculatedStyles = calculateEventsPosition(events);

    return (
      <div style={styles.eventsLayout}>
        {events.map((event: EventType) => {
          const calculatedStyle = calculatedStyles.find(
            style => style.id.toString() === event.id
          );
          return (
            <Event
              deleteEvent={deleteEvent}
              key={event.id}
              event={event}
              calculatedStyle={calculatedStyle}
              dialogs={dialogs}
              toggleDialog={toggleDialog}
            />
          );
        })}
      </div>
    );
  };
}

export default Day;
