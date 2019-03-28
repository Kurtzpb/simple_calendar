// modules
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// dialogs
import { CONFIRM_DIALOG } from '../../actions/dialogs';

type Styles = React.CSSProperties;

const styles = {
  action: {
    justifyContent: 'center'
  } as Styles,
  modal: { top: '-25%' } as Styles,
  title: {
    textAlign: 'center'
  } as Styles
};

interface ConfirmDialogProps {
  // dialogs
  dialogs: any;
  // handle dialog close
  toggleDialog: (dialog: string, flag: boolean, message: string) => void;
  // confirmation action
  handleConfirm: () => void;
}

export class ConfirmDialog extends React.PureComponent<ConfirmDialogProps> {
  static defaultProps = {
    isOpen: false
  };

  render() {
    const { dialogs } = this.props;
    const { message } = dialogs;
    const isOpen = dialogs[CONFIRM_DIALOG];

    return (
      <Dialog
        fullWidth
        style={{ ...styles.modal }}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle style={{ ...styles.title }} id='alert-dialog-title'>
          {message}
        </DialogTitle>
        <DialogActions style={{ ...styles.action }}>
          <Button onClick={this.handleConfirm} color='primary'>
            OK
          </Button>
          <Button onClick={this.handleCloseDialog} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  /** method that close dialog if confirmation was canceled
   */
  private handleCloseDialog = (): void => {
    const { toggleDialog } = this.props;

    toggleDialog(CONFIRM_DIALOG, false, '');
  };

  /** method that handles confirmation
   */
  private handleConfirm = (): void => {
    const { toggleDialog, handleConfirm } = this.props;

    handleConfirm();
    toggleDialog(CONFIRM_DIALOG, false, '');
  };
}

export default ConfirmDialog;
