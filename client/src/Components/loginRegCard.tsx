import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  TextField,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import Alert from '@mui/material/Alert';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CheckCircle from '@mui/icons-material/CheckCircle';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Snackbar from '@mui/material/Snackbar'
import { useNavigate } from 'react-router-dom';
import { LottieAnimation } from './Animation';
import { useEffect } from 'react';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const LoginRegCard = () => {
  const [value, setValue] = useState<number>(0);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('')
  const [registerPassword, setRegisterPassword] = useState<string>('')
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false)
  const [signupError, setSignupError] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<boolean>(false)
  const [showAnimation, setShowAnimation] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false)
  const navigate = useNavigate()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const signup = (email: string, name: string, password: string): void => {
    axios.defaults.withCredentials = true;
    axios
      .post(
        'http://localhost:8080/createuser',
        { email, name, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      )
      .then((res: AxiosResponse) => {
        console.log(res);
        setSignupSuccess(true)
        setTimeout(() => {
          setValue(0)
        }, 2000);

      })
      .catch((err) => {
        console.error(err)
        setSignupError(true)
      });
  };
  const handleRegisterSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    signup(registerEmail, username, registerPassword)
  }


  //login

  const login = (email: string, password: string) => {
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8080/loginuser ',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    ).then((res: AxiosResponse) => {
      console.log(res)
      setLoading(true)
      if (res.data.Status === 'success') {
        setTimeout(() => {
          setShowAnimation(true)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('email', res.data.email)
          localStorage.setItem('_id', res.data.id)
          setLoginSuccess(true)
        }, 1500)
      }
      else {
        navigate('/')
        setTimeout(() => {
          setLoading(false)
          setLoginError(true)
        }, 1500);
      }
    }).catch((err) => console.log(err))
  }

  useEffect(() => {

    if (showAnimation) {
      navigate('/animation');
      setTimeout(() => {
        navigate('/home')
      }, 3400)
    }
  }, [showAnimation, navigate]);

  const handleLogin = (event: React.SyntheticEvent) => {
    event.preventDefault()
    login(loginEmail, password)
  }

  const handleClose = () => {
    setLoginSuccess(false)
  }

  return (
    <Card elevation={5} sx={{ backgroundColor: '#E4F1FF', marginTop: "6em", width: { md: 330, xs: 300 }, minWidth: 300, borderRadius: '1em' }}>
      <Box
      // sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="sign in" {...a11yProps(0)} />
          <Tab label="sign up" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <LockOpenIcon sx={{ fontSize: '35px' }} />
        </Box>
        <TextField id="outlined-basic" label='Email' variant="outlined" sx={{ borderRadius: '2em', width: '100%', marginTop: '1em' }}
          value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        <TextField id="outlined-basic2" label='Password' variant="outlined" sx={{ width: '100%', marginTop: '1em' }}
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          <Button type='submit' onClick={handleLogin} variant="contained" disabled={loading} >{loading ? <CircularProgress size={22} /> : 'Submit'}</Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          {loginError && <Alert severity='error'>Invalid credentials</Alert>}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PersonIcon sx={{ fontSize: '35px' }} />
        </Box>
        <TextField id="outlined-basic" label="Student Name" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ width: '100%', marginTop: '1em' }} />
        <TextField id="outlined-basic1" label="Email" variant="outlined" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} sx={{ width: '100%', marginTop: '1em' }} />
        <TextField id="outlined-basic1" label="Password" variant="outlined" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} sx={{ width: '100%', marginTop: '1em' }} />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
          <Button type='submit' variant="contained" onClick={handleRegisterSubmit} disabled={loading} >{loading ? <CircularProgress size={22} /> : 'Submit'}</Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
          {signupError && <Alert severity='error'>please give valid credentials</Alert>}
          {signupSuccess && <Alert severity='success'>Registered Succesfully </Alert>}
        </Box>
      </CustomTabPanel>
      <Snackbar
        open={loginSuccess}
        autoHideDuration={1700}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '20em' }}>
          Login succesfull
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default LoginRegCard;
