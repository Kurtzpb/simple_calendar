// modules
import * as React from 'react';
import _ from 'lodash';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

// types
import { EventType } from '../../../types';

//components
import { ConfirmDialog } from '../../dialogs';

// utils
import { calculateEventTopAndHeigth } from '../../../utils';

// constants
import {
  dayLength,
  stylesConstants,
  deleteEventConfirmTitle
} from '../../../constants';

// dialogs
import { CONFIRM_DIALOG } from '../../../actions/dialogs';

type StyleType = React.CSSProperties;

const { eventBorderWidth, eventsZIndex } = stylesConstants;

const styles = (start, end) => ({
  event: {
    backgroundColor: '#E2ECF5',
    borderLeft: `${eventBorderWidth}px solid #6E9ECF`,
    zIndex: eventsZIndex,
    top: `${calculateEventTopAndHeigth(dayLength.from, start)}px`,
    height: `${calculateEventTopAndHeigth(start, end)}px`,
    position: 'absolute',
    fontSize: '14px'
  } as StyleType,
  deleteIcon: {
    width: '5px',
    height: '5px',
    marginTop: '70px',
    marginLeft: '172px',
    cursor: 'pointer'
  } as StyleType
});

interface EventProps {
  // event
  event: EventType;
  // styles
  calculatedStyle: any;
  // removing event
  deleteEvent: (id: string) => void;
  // method toggles dialogs
  toggleDialog: (dialogType: string, flag: boolean, message: string) => void;
  // dialogs
  dialogs: any;
}

export class Event extends React.PureComponent<EventProps> {
  static defaultProps = {
    event: { timeStart: '', timeEnd: '', title: '' } as EventType
  };

  public render() {
    return this.renderEvent();
  }

  /** method that renders single event
   * @return {JSX.Element}
   */
  private renderEvent = (): JSX.Element => {
    const { event, calculatedStyle, toggleDialog, dialogs } = this.props;
    const { timeStart, timeEnd, title, id } = event;
    const { left, width } = calculatedStyle;

    return (
      <div style={{ ...styles(timeStart, timeEnd).event, left, width }}>
        <ConfirmDialog
          toggleDialog={toggleDialog}
          dialogs={dialogs}
          handleConfirm={this.deleteEvent(id)}
        />
        <div style={{ marginTop: '5px', marginLeft: '5px' }}>{title}</div>
        <div
          style={{ ...styles('', '').deleteIcon }}
          onClick={this.toggleDialog}
        >
          <DeleteForeverSharpIcon />
        </div>
      </div>
    );
  };

  /** method that toggles confirm delete event dialog
   */
  private toggleDialog = () => {
    const { toggleDialog } = this.props;

    toggleDialog(CONFIRM_DIALOG, true, deleteEventConfirmTitle);
  };

  /** method that deletes event
   * @param {id} - event's id
   */
  private deleteEvent = id => () => {
    const { deleteEvent } = this.props;

    deleteEvent(id);
  };
}

export default Event;
