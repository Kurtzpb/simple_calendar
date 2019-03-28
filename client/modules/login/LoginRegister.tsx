// modules
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

// constants
import {
  passwordMessage,
  confirmPasswordMessage,
  usernameMessage
} from '../../constants';

// utils
import { passwordValidation, usernameValidation } from '../../utils';

type Styles = React.CSSProperties;

const styles = {
  layout: {
    width: '100%',
    height: '60%',
    position: 'fixed',
    top: '15%',
    left: 0,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'auto'
  } as Styles,
  login: {
    width: '35%'
  } as Styles,
  header: {
    textAlign: 'center',
    marginTop: '20px'
  } as Styles,
  textField: {
    width: '80%',
    marginBottom: '20px',
    marginLeft: '10%'
  } as Styles,
  buttons: {
    marginBottom: '10px'
  } as Styles,
  switchBtn: { float: 'right', marginRight: '15px' } as Styles,
  confirmBtn: {
    position: 'absolute',
    left: '50%',
    margin: '-10px 0px 0px -34px'
  } as Styles
};

interface LoginRegisterProps {
  // register or login user
  registerLoginUser: (data: any, flag: boolean) => void;
}

export class LoginRegister extends React.PureComponent<LoginRegisterProps> {
  state = {
    register: false,
    data: {
      userName: '',
      password: '',
      confirmPassword: ''
    }
  };

  public render() {
    return <div style={styles.layout}>{this.renderLiginRegister()}</div>;
  }

  private renderLiginRegister = () => {
    const { register, data } = this.state;
    const { userName, password, confirmPassword } = data;

    return (
      <Paper style={styles.login}>
        <Typography style={styles.header} variant='h5' component='h3'>
          {register ? 'Register' : 'Login'}
        </Typography>
        <div style={styles.textField}>
          <Tooltip
            placement='right'
            title={`${
              register && !usernameValidation(userName) ? usernameMessage : ''
            }`}
          >
            <TextField
              style={{
                borderBottom: `${
                  register && !usernameValidation(userName)
                    ? '1px solid red'
                    : ''
                }`
              }}
              autoFocus
              required
              margin='dense'
              value={userName}
              onChange={this.handleInputs('userName')}
              label='Login'
              type='text'
              fullWidth
            />
          </Tooltip>
          <Tooltip
            placement='right'
            title={`${
              register && !passwordValidation(password) ? passwordMessage : ''
            }`}
          >
            <TextField
              style={{
                borderBottom: `${
                  register && !passwordValidation(password)
                    ? '1px solid red'
                    : ''
                }`
              }}
              required
              margin='dense'
              value={password}
              onChange={this.handleInputs('password')}
              label='Password'
              type='password'
              fullWidth
            />
          </Tooltip>
          {register && (
            <Tooltip
              placement='right'
              title={`${
                password &&
                passwordValidation(password) &&
                password !== confirmPassword
                  ? confirmPasswordMessage
                  : ''
              }`}
            >
              <TextField
                style={{
                  borderBottom: `${
                    password &&
                    passwordValidation(password) &&
                    password !== confirmPassword
                      ? '1px solid red'
                      : ''
                  }`
                }}
                required
                margin='dense'
                value={confirmPassword}
                onChange={this.handleInputs('confirmPassword')}
                label='Confirm Password'
                type='password'
                fullWidth
              />
            </Tooltip>
          )}
        </div>
        <div style={styles.buttons}>
          <Button
            style={styles.confirmBtn}
            variant='contained'
            onClick={this.handleConfirm}
            color='primary'
            disabled={!this.setConfirmBtnDisable()}
          >
            {register ? 'Register' : 'Login'}
          </Button>
          <Button
            style={styles.switchBtn}
            onClick={this.toggleForm}
            color='primary'
          >
            {register ? 'Login' : 'Register'}
          </Button>
        </div>
      </Paper>
    );
  };

  /** method that sets form values
   * @param {field} - field that should be change
   * @param {event} - handled event object
   */
  private handleInputs = (field: string): any => (event: any): void => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [field]: event.target.value
      }
    });
  };

  /** method that toggles form type
   */
  private toggleForm = (): void => {
    const { register } = this.state;

    this.setState({
      data: {
        userName: '',
        password: '',
        confirmPassword: ''
      },
      register: !register
    });
  };

  /** method that handles confirmation of login/register
   */
  private handleConfirm = (): void => {
    const { register, data } = this.state;
    const { registerLoginUser } = this.props;

    this.setState({
      ...this.state,
      data: {
        userName: '',
        password: '',
        confirmPassword: ''
      }
    });

    registerLoginUser(data, register);
  };

  /** method that validates input fields
   * @return {boolean} - validation result
   */
  private setConfirmBtnDisable = (): boolean => {
    const { register, data } = this.state;
    const { userName, password, confirmPassword } = data;

    const flag = register
      ? usernameValidation(userName) &&
        passwordValidation(password) &&
        passwordValidation(confirmPassword) &&
        password === confirmPassword
      : userName && password;

    return Boolean(flag);
  };
}

export default LoginRegister;
