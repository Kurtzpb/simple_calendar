// modules
import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// dialogs
import { ADD_EVENT_DIALOG } from '../../actions/dialogs';

interface AddEventDialogProps {
  // prop of calendar day listing
  date: string;
  // prop that toggles dialog
  isOpen: boolean;
  // method toggles dialogs
  toggleDialog: (dialogType: string, flag: boolean, message: string) => void;
  // adding event
  addEvent: (event: any) => void;
}

export class AddEventDialog extends React.PureComponent<AddEventDialogProps> {
  static defaultProps = {
    date: '',
    isOpen: false
  };

  state = { timeStart: '08:00', timeEnd: '17:00', title: '' };

  render() {
    const { isOpen } = this.props;

    return (
      <div>
        <Button variant='contained' color='primary' onClick={this.openDialog}>
          Add Event
        </Button>
        <Dialog open={isOpen} onClose={this.cancelDialog}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin='dense'
              onChange={this.setEventValue('title')}
              id='name'
              label='Title'
              type='text'
              fullWidth
            />
            <TextField
              label='Start'
              type='time'
              defaultValue='08:00'
              onChange={this.setEventValue('timeStart')}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 900 // 15 min
              }}
            />
            <TextField
              label='End'
              type='time'
              defaultValue='17:00'
              onChange={this.setEventValue('timeEnd')}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 900 // 15 min
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.addEvent}
              color='primary'
              disabled={!this.state.title}
            >
              Add
            </Button>
            <Button onClick={this.cancelDialog} color='primary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  /** method that add event
   */
  private addEvent = (): void => {
    const { toggleDialog, addEvent } = this.props;

    addEvent(this.state);
    toggleDialog(ADD_EVENT_DIALOG, false, '');
    this.setState({ ...this.state, title: '' });
  };

  /** method that close dialog if adding canceled
   */
  private cancelDialog = (): void => {
    const { toggleDialog } = this.props;

    toggleDialog(ADD_EVENT_DIALOG, false, '');
  };

  /** method that opens add event dialog
   */
  private openDialog = (): void => {
    const { toggleDialog } = this.props;

    toggleDialog(ADD_EVENT_DIALOG, true, '');
  };

  /** method that sets event value
   * @param {field} - field that should be change
   * @param {event} - handled event object
   */
  private setEventValue = field => event => {
    this.setState({ ...this.state, [field]: event.target.value });
  };
}

export default AddEventDialog;
