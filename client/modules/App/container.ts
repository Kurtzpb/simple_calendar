// modules
import { connect } from 'react-redux';

// component
import Layout from './index';

// selectors
import { calendar$, dialogs$, userName$, token$ } from '../../selectors';

// actions
import { addEvent, getEvents, deleteEvent } from '../../actions/calendar';
import { toggleDialog } from '../../actions/dialogs';
import { fetchUser, logout, registerLoginUser } from '../../actions/user';

const mapStateToProps = state => ({
  days: calendar$(state),
  dialogs: dialogs$(state),
  userName: userName$(state),
  token: token$(state)
});

const mapDispatchToProps = dispatch => ({
  addEvent: event => dispatch(addEvent(event)),
  toggleDialog: (dialog, flag, message) =>
    dispatch(toggleDialog(dialog, flag, message)),
  fetchUser: () => dispatch(fetchUser()),
  logout: () => dispatch(logout()),
  registerLoginUser: (data, flag) => dispatch(registerLoginUser(data, flag)),
  getEvents: () => dispatch(getEvents()),
  deleteEvent: id => dispatch(deleteEvent(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
