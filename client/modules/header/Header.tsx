// modules
import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// utils
import { getToken } from '../../utils';

interface HeaderProps {
  // user name
  userName: string | null;
  // fetch user
  fetchUser: () => void;
  // logout
  logout: () => void;
  // auth token
  token: string | null;
}

export class Header extends React.PureComponent<HeaderProps> {
  static defaultProps = {
    userName: null
  };

  public componentDidMount() {
    const { fetchUser } = this.props;

    if (getToken()) {
      fetchUser();
    }
  }

  public render() {
    const { userName, token } = this.props;

    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                width: '97%'
              }}
              align='center'
              variant='h6'
              color='inherit'
            >
              Calendar
            </Typography>
            {token && (
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '95%',
                  marginBottom: '15px'
                }}
              >
                <Typography align='right' variant='subtitle1' color='inherit'>
                  {userName}
                </Typography>
                <Typography
                  onClick={this.logout}
                  align='right'
                  variant='button'
                  color='inherit'
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </Typography>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  /** method that handles press logout
   */
  private logout = () => {
    const { logout } = this.props;

    logout();
  };
}

export default Header;
