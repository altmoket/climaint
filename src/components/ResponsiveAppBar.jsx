import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Button, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useGlobalContext } from '../context/globalContext';
import { useTheme } from '@emotion/react';
import { useNotification } from '../hooks/NotificationContext';
import { useNavigate } from 'react-router-dom';

function ResponsiveAppBar({ openMenu }) {
  const { state, dispatch } = useGlobalContext();
  const { showNotification } = useNotification()
  const navigate = useNavigate();
  const theme = useTheme()

  const handleOpenNavMenu = (e) => {
    openMenu();
  };

  const handleLogout = () => {
    dispatch({ type: "SET_TOKEN", payload: null });
    dispatch({ type: "SET_USERID", payload: null });
    dispatch({ type: "SET_ISLOGGED", payload: false });
    showNotification("Sesión cerrada satisfactoriamente")
    navigate('/')
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#0d1621' }}>
      <Toolbar sx={{ borderBottom: '1px solid #ffffff', borderColor: 'black', bgcolor: theme.palette.background.default }}>
        <Box width={'100%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems="center">
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, mr: '5px' }}>
              <IconButton onClick={handleOpenNavMenu} color="inherit" aria-label="open menu">
                <MenuIcon fontSize="large" />
              </IconButton>
            </Box>

            <Button startIcon={<LocalFireDepartmentIcon />}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',

                }}
              >
                CLIMAINT
              </Typography>
            </Button>

          </Box>

          <Stack direction={'row'} alignItems="center">
            <Typography variant='h6' marginInlineEnd={'10px'}>{state.username}</Typography>
            <Button sx={{ bgcolor: theme.palette.primary.dark, borderRadius: '10px' }} endIcon={<LogoutIcon fontSize='small' />} variant="contained" color={"primary"} onClick={handleLogout}>
              Salir
            </Button>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
