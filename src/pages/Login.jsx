import { useGlobalContext } from '../context/globalContext';
import { TextField, Button, Grid, Typography, Box, FormControlLabel, Checkbox, FormControl } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import useLoginViewModel from '../viewModels/loginViewModel';
import LoadingScreen from '../components/LoadingScreen';

function Login() {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const {
    userInfo,
    handleChange,
    onSubmit,
    errors,
    loading
  } = useLoginViewModel({ dispatch, navigate })

  if (loading) return <LoadingScreen/>
  
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
      </Box>
    </Box>
  );
}

export default Login;
