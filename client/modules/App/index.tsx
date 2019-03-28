// modules
import * as React from 'react';

// components
import Calendar from '../calendar';
import LoginRegister from '../login';
import Header from '../header';
import { AlertDialog } from '../dialogs';

// utils
import { getToken } from '../../utils';

interface LayoutProps {
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
  // username
  userName: string | null;
  // auth token
  token: string | null;
  // fetching user
  fetchUser: () => void;
  // logout
  logout: () => void;
  // register or user
  registerLoginUser: (data: any, flag: boolean) => void;
}

export class Layout extends React.PureComponent<LayoutProps> {
  render() {
    const {
      days,
      dialogs,
      toggleDialog,
      addEvent,
      userName,
      fetchUser,
      logout,
      registerLoginUser,
      token,
      getEvents,
      deleteEvent
    } = this.props;
    // document.cookie = 'token=';
    return (
      <div>
        <Header
          userName={userName}
          fetchUser={fetchUser}
          logout={logout}
          token={token}
        />
        {getToken() ? (
          <Calendar
            days={days}
            dialogs={dialogs}
            toggleDialog={toggleDialog}
            addEvent={addEvent}
            getEvents={getEvents}
            deleteEvent={deleteEvent}
          />
        ) : (
          <LoginRegister registerLoginUser={registerLoginUser} />
        )}
        <AlertDialog toggleDialog={toggleDialog} dialogs={dialogs} />
      </div>
    );
  }
}

export default Layout;
