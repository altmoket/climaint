import { useGlobalContext } from '../context/globalContext';
import { TextField, Button, Grid, Typography, Box, FormControlLabel, Checkbox, FormControl, Card, CardContent } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import useLoginViewModel from '../viewModels/loginViewModel';
import LoadingScreen from '../components/LoadingScreen';

function Login() {
  const { state, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const {
    userInfo,
    handleChange,
    onSubmit,
    errors,
    loading
  } = useLoginViewModel({ state, dispatch, navigate })

  if (loading) return <LoadingScreen />

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/main.webp)', // Updated path to the local image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%', // Adjust image to the container
        width: '100%', // Adjust image to the container
        '@media (max-width: 600px)': { // Responsive styles
          backgroundPosition: 'top',
          padding: 2
        }
      }}>
        <Card sx={{ maxWidth: 400, width: '100%', padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)', '@media (max-width: 600px)': { padding: 2 } }}>
          <CardContent>
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;