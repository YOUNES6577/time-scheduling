import * as React from 'react';
import * as $ from 'jquery'
import Axios from 'axios';
import 'bootstrap'
import logo from '../logo.svg';
import icon from '../favicon.ico';
import '../Stylesheets/Login.css';
import { InputAdornment, OutlinedInput, Stack, IconButton, FormControl, InputLabel } from '@mui/material';
import { VisibilityOff, Fingerprint, Visibility } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


const serverIp = 'http://129.45.38.237:3001'
const Icon = () => <a className="logo" href='/'><img alt='logo' width='125px' height='125px' src={icon} /></a>;

async function loginUser(credentials) {
  return fetch(`${serverIp}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: credentials })
  })
    .then(data => data.json())
    .catch(err => Promise.reject(`Authentication Failed! ${err}`))
    .finally(() => {
    })
}
export function  isAuthenticated() {
  return {
      state: localStorage.getItem('access-token') && localStorage.getItem('access-token-expiration') > Date.now(),
      token: localStorage.getItem('access-token')
  }
}

export default function Login(props) {
  let navigate = useNavigate();

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const [password, setPassword] = React.useState('')
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value)
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const Token = await loginUser(password);
    var time = new Date(Date.now())
    if (!Token.token) {
      console.error(" Login Failed ! . {" + time.toLocaleTimeString('en-US') + "}")
      $('.Login-error').removeClass('d-none').text('Wrong Password !').fadeIn(1000)
    } else {
      console.log(" Login Success . {" + time.toLocaleTimeString('en-US') + "}")
      $('.Login-error').addClass('d-none').text('').fadeIn(500)
      props.setToken(Token)
      const authentication = isAuthenticated()
      console.dir(authentication)
      if (authentication.state && props.Redirect === undefined)
        Axios.post(serverIp + `/login/redirect`, { token: authentication.token })
          .then(res => {
            console.log('Redirecting from server .')
          })
    }
  }
  return (
    <div className="App">
      <Icon />
      <header className="App-header">
        <h3>Login</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" color='secondary'>Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              onFocus={() => { $('.Login-error').text('').addClass('d-none') }}
              color='secondary'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color='secondary'
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <IconButton
            type='submit'
            aria-label="fingerprint"
            color="secondary"
            onClick={handleSubmit}
          >
            <Fingerprint />
          </IconButton>
        </Stack>
        <div className='Login-error  text-danger p-2 mt-2 d-none'></div>
      </header>
    </div>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}