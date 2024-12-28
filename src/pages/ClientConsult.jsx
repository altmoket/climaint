import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import ClientTable from '../components/ClientTable';
import LoadingScreen from '../components/LoadingScreen';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useClientConsultViewModel from '../viewModels/clientConsultViewModel';
import { useGlobalContext } from '../context/globalContext';

const ClientConsult = () => {
  const { state } = useGlobalContext()
  const navigate = useNavigate();

  const { loading, setSearch, clients, eliminarCliente } = useClientConsultViewModel({ token: state.token, userId: state.userId })

  if (loading) {
    return <LoadingScreen />;
  }

  const editarCliente = (id) => {
    navigate('/client-maintenance', { state: { clientId: id } });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
        <Header navigate={navigate} />
        <Box mt={2}>
          <SearchBar setSearch={setSearch} />
        </Box>
        <ClientTable
          clients={clients}
          onEdit={editarCliente}
          onDelete={eliminarCliente}
        />
      </Paper>
    </Box>
  );
};

const Header = ({ navigate }) => {
  const theme = useTheme()
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display: 'flex', flexDirection: isSmScreen ? 'column' : 'row', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
      {isSmScreen && (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button startIcon={<PersonAddIcon />} variant="contained" color="primary" onClick={() => navigate('/client-maintenance')}>Agregar</Button>
          <Button startIcon={<ArrowBackIcon />} variant="outlined" color="error" onClick={() => navigate('/')}>Regresar</Button>
        </Stack>
      )}
      <Typography variant={'h5'}>Consulta de Clientes</Typography>
      {!isSmScreen && (
        <Stack direction="row" spacing={1}>
          <Button startIcon={<PersonAddIcon />} variant="contained" color="primary" onClick={() => navigate('/client-maintenance')}>Agregar</Button>
          <Button startIcon={<ArrowBackIcon />} variant="outlined" color="error" onClick={() => navigate('/')}>Regresar</Button>
        </Stack>
      )}
    </Box>
  )
};

export default ClientConsult;
