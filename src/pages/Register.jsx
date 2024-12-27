import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useRegisterViewModel from '../viewModels/registerViewModel';
import LoadingScreen from '../components/LoadingScreen';

function Register() {

  const navigate = useNavigate();

  const {
    onSubmit,
    formData,
    errors,
    handleChange,
    loading
  }
    = useRegisterViewModel({ navigate })

  if (loading) return <LoadingScreen />
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
    </Box>
  );
}

export default Register;
