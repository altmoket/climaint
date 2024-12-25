import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function ResponsiveAppBar() {

  const handleOpenNavMenu = (e) => {
    console.log("Icono presionado")
  } 

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Menu icon */}
        <Box sx={{ display: { xs: 'block', sm: 'none' }, mr: '5px' }}>
          <IconButton onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>

        <Typography
          variant="h6"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit'
          }}
        >
          CLIMAINT
        </Typography>
        <Stack direction={'row-reverse'} width={"100%"} >
          <IconButton>
            <LogoutIcon fontSize='medium'></LogoutIcon>
          </IconButton>
          <Typography my={"auto"}>Usuario</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
