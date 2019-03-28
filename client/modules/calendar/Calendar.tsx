// modules
import * as React from 'react';
import _ from 'lodash';
import Button from '@material-ui/core/Button';

// components
import Day from './day';
import { AddEventDialog } from '../dialogs';

// dialogs
import { ADD_EVENT_DIALOG } from '../../actions/dialogs';

// utils
import { getToken, prepareDataToExport } from '../../utils';

type StyleType = React.CSSProperties;

const styles = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  } as StyleType,
  buttons: {
    width: '120px',
    position: 'absolute',
    top: '14%',
    left: '65%'
  } as StyleType,
  header: { textAlign: 'center' } as StyleType,
  exportBtn: {
    marginTop: '10px'
  } as StyleType
};

interface CalendarProps {
  // prop of calendar day listing
  days: any;
  // dialogs
  dialogs: any;
  // method toggles dialogs
  toggleDialog: (dialogType: string, flag: boolean, message: string) => void;
  // fetching events
  getEvents: () => void;
  // adding event
  addEvent: (event: any) => void;
  // removing event
  deleteEvent: (id: string) => void;
}

export class Calendar extends React.PureComponent<CalendarProps> {
  static defaultProps = {
    days: {},
    dialogs: {}
  };

  public componentDidMount() {
    const { getEvents } = this.props;

    if (getToken()) {
      getEvents();
    }
  }

  public render() {
    const { days, dialogs, toggleDialog, addEvent } = this.props;
    return (
      <div>
        <div style={styles.buttons}>
          <AddEventDialog
            date={Object.keys(days)[0]}
            isOpen={dialogs[ADD_EVENT_DIALOG]}
            toggleDialog={toggleDialog}
            addEvent={addEvent}
          />
          <Button
            style={styles.exportBtn}
            onClick={this.exportToJsonFile(days[Object.keys(days)[0]])}
            variant='contained'
            color='secondary'
          >
            Export
          </Button>
        </div>
        <h2 style={styles.header}>{Object.keys(days)[0]}</h2>
        {this.renderDays()}
      </div>
    );
  }

  /** method that renders days of calendar
   * @return {JSX.Element}
   */
  private renderDays = (): JSX.Element => {
    const { days, deleteEvent, dialogs, toggleDialog } = this.props;

    return (
      <div style={styles.calendar}>
        {Object.keys(days).map((key: string) => (
          <Day
            deleteEvent={deleteEvent}
            key={key}
            events={days[key]}
            dialogs={dialogs}
            toggleDialog={toggleDialog}
          />
        ))}
      </div>
    );
  };

  /** method that exports events to JSON file
   * @param {Array}
   */
  private exportToJsonFile = events => () => {
    if (!events.length) return null;

    const dataStr = JSON.stringify(prepareDataToExport(events));
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'calendar.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
}

export default Calendar;
