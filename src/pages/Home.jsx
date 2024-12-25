import { Typography, Container } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 5 }}>
      <Typography variant="h3" gutterBottom>
        ¡Bienvenido!
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Estamos felices de tenerte aquí.
      </Typography>
    </Container>
  );
}

export default Home;
