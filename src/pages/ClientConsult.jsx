import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import ClientTable from '../components/ClientTable';
import LoadingScreen from '../components/LoadingScreen';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useClientViewModel from '../viewModels/clientViewModel';
import { useGlobalContext } from '../context/globalContext';

const ClientConsult = () => {
  const { state } = useGlobalContext()
  const navigate = useNavigate();

  const { loading, error, setSearch, clients, eliminarCliente } = useClientViewModel({ token: state.token, userId: state.userId })

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  // TODO: Handle errors and show notifications
  const editarCliente = (id) => {
    navigate('/client-maintenance', { state: { clientId: id } });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Header navigate={navigate} />
      <Divider />
      <Box mt={2}>
        <SearchBar setSearch={setSearch} />

      </Box>
      <ClientTable
        clients={clients}
        onEdit={editarCliente}
        onDelete={eliminarCliente}
      />
    </Box>
  );
};

const ErrorScreen = ({ error }) => (
  <Box sx={{ p: 3 }}>
    <Alert severity="error">{error}</Alert>
  </Box>
);

const Header = ({ navigate }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
    <Typography variant="h4">Consulta de Clientes</Typography>
    <Stack direction={"row"} spacing={1}>
      <Button startIcon={<PersonAddIcon />} variant="contained" color="primary" onClick={() => navigate('/client-maintenance')}>Agregar</Button>
      <Button startIcon={<ArrowBackIcon />} variant="outlined" color="error" onClick={() => navigate('/')}>Regresar</Button>
    </Stack>
  </Box>
);

export default ClientConsult;
