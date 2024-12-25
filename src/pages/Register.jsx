import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validateUsername } from '../utils/validations';
import { registerUser } from '../utils/users';
import Notification from '../components/Notification';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'email') {
      const validatedEmail = validateEmail(value);
      setErrors({
        ...errors,
        email: !validatedEmail.isValid() ? validatedEmail.getErrors().join(', ') : null
      });
    }

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
    !errors.email &&
    !errors.password &&
    formData.username &&
    formData.email &&
    formData.password;

  const onSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      if (Object.keys(errors).length === 0) {
        registerUser(formData)
          .then((data) => {
            navigate('/login', { state: { message: "Se ha registrado correctamente" } });
          })
          .catch((err) => console.error(err));
      }
    } else {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

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
          Registrarse
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de Usuario *"
                variant="outlined"
                name="username"
                value={formData.username}
                error={!!errors.username}
                onChange={handleChange}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico *"
                type="email" // Cambié de text a email
                variant="outlined"
                name="email"
                value={formData.email}
                error={!!errors.email}
                onChange={handleChange}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña *"
                type="password"
                variant="outlined"
                name="password"
                value={formData.password}
                error={!!errors.password}
                onChange={handleChange}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
              Inicia sesión
            </Link>
          </Typography>
        </Box>
      </Box>
      {showNotification && <Notification message="Completa los campos con error antes de registrarte" severity='error' />}
    </Box>
  );
}

export default Register;
