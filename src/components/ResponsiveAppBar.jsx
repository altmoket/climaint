import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Grid, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';

const pages = ['Products', 'Pricing', 'Blog'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Box sx={{shapeMargin
          
        }}>
          <MenuIcon fontSize='medium'></MenuIcon>
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
    // </Box>
  );
}
export default ResponsiveAppBar;
