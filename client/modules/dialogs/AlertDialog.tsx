// modules
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// dialogs
import { ALERT_DIALOG } from '../../actions/dialogs';

type Styles = React.CSSProperties;

const styles = {
  action: {
    justifyContent: 'center'
  } as Styles,
  modal: { top: '-25%' } as Styles
};

interface AlertDialogProps {
  // dialogs
  dialogs: any;
  // handle dialog close
  toggleDialog: (dialog: string, flag: boolean, message: string) => void;
}

export class AlertDialog extends React.PureComponent<AlertDialogProps> {
  static defaultProps = {
    isOpen: false
  };

  render() {
    const { dialogs } = this.props;
    const { message } = dialogs;
    const isOpen = dialogs[ALERT_DIALOG];

    return (
      <Dialog
        style={{ ...styles.modal }}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{message}</DialogTitle>
        <DialogActions style={{ ...styles.action }}>
          <Button onClick={this.handleCloseDialog} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  /** method that close dialog
   */
  private handleCloseDialog = (): void => {
    const { toggleDialog } = this.props;

    toggleDialog(ALERT_DIALOG, false, '');
  };
}

export default AlertDialog;
