import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/globalContext';
import { TextField, Button, Grid, Typography, Box, FormControlLabel, Checkbox, FormControl } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/users';
import Notification from '../components/Notification';
import { validatePassword, validateUsername } from '../utils/validations';
import LoadingScreen from '../components/LoadingScreen';

function Login() {
  const { dispatch } = useGlobalContext();
  const [userInfo, setUserInfo] = useState({ username: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState('');
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: type === 'checkbox' ? checked : value
    });

    if (name === 'password') {
      const validatedPassword = validatePassword(value);
      setErrors({
        ...errors,
        password: !validatedPassword.isValid() ? validatedPassword.getErrors().join(', ') : null
      });
    }

    if (name === 'username') {
      const validatedUsername = validateUsername(value)
      setErrors({
        ...errors,
        username: !validatedUsername.isValid() ? validatedUsername.getErrors().join(', ') : null
      });
    }
  };

  const isFormValid =
    !errors.username &&
    !errors.password &&
    userInfo.username &&
    userInfo.password;

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      localStorage.setItem("remember", userInfo.remember);

      if (userInfo.remember) {
        localStorage.setItem("username", userInfo.username);
      } else {
        localStorage.removeItem('username');
      }
      
      loginUser({ username: userInfo.username, password: userInfo.password })
        .then(({ data }) => {
          const { token, userid } = data;
          dispatch({ type: 'SET_TOKEN', payload: token });
          dispatch({ type: 'SET_USERID', payload: userid });
          dispatch({ type: 'SET_ISLOGGED', payload: true });

          setLoginMessage("Se ha logueado satisfactoriamente")

          setTimeout(() => {
            navigate('/');
          }, 2000);
        })
        .catch(err => {
          console.error(err);
          setLoginError('Nombre de usuario o contraseña incorrectos');
        });
    } else {
      setLoginError("Completa los campos con error antes de registrarte")
    }
  };

  useEffect(() => {
    if (localStorage.getItem('remember')) {
      const username = localStorage.getItem('username') || '';
      setUserInfo(prev => ({ ...prev, username }));
    }
  }, []);

  if (loginMessage) {
    return <><LoadingScreen /><Notification message={loginMessage}/></>
  }
  

  return (
    <Box sx={{
      height: '100vh',
      maxWidth: 600,
      padding: 3,
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box sx={{
        maxHeight: 500,
        padding: { xs: '20px', md: '60px' },
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Iniciar Sesión
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="username"
                label="Nombre de Usuario *"
                variant="outlined"
                value={userInfo.username}
                error={!!errors.username}
                onChange={handleChange}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Contraseña *"
                type="password"
                variant="outlined"
                value={userInfo.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormControlLabel
                  control={<Checkbox checked={userInfo.remember} />}
                  label="Recuérdame"
                  name="remember"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            ¿Aún no tienes una cuenta?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
              Regístrate
            </Link>
          </Typography>
        </Box>
        {loginError && <Notification message={loginError} severity='error' />}
        
      </Box>
    </Box>
  );
}

export default Login;
