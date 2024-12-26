import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, useTheme } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Leftbar from '../components/Leftbar';

const Layout = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const toggleLeftBar = () => {
    setOpen(prev => !prev)
  }

  return (
    <Grid container direction="column">
      {/* Barra de navegación superior */}
      <Grid item position="sticky" width="100%" zIndex={1001} top={0}>
        <ResponsiveAppBar openMenu={toggleLeftBar} />
      </Grid>

      <Grid item sx={{ marginTop: 0 }}>
        <Grid item
          md={3}
          display={{ xs: open ? 'flex' : 'none', md: 'flex' }}
          position={{ xs: "absolute", md: "fixed" }}
          top={{ xs: '10px', md: 0 }}
          sx={{
            height: 'calc(100vh - 64px)', overflowY: 'auto', top: '64px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            bgcolor: theme.palette.background.default,
            zIndex: 1000,
            width: '100%'
          }}>
          <Leftbar toggleBar={toggleLeftBar} />
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
