import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Leftbar from '../components/Leftbar';

const Layout = () => {
  return (
    <Grid container direction="column">
      {/* Barra de navegación superior */}
      <Grid item position="fixed" width="100%" zIndex={1}>
        <ResponsiveAppBar />
      </Grid>

      <Grid item sx={{ marginTop: '64px'}}> {/* Ajustar el margen superior para la altura de la AppBar */}
        <Grid item
          md={3}
          display={{ xs: 'none', sm: 'none', md: 'flex' }}
          position="fixed"
          sx={{ height: 'calc(100vh - 64px)', overflowY: 'auto', top: '64px', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%'}}>
          <Leftbar />
        </Grid>
        <Grid container>
          {/* Barra lateral fija */}
          <Grid item xs={12} sm={12} md={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
            {/* <Outlet /> */}
          </Grid>

          {/* Contenido principal */}
          <Grid item xs={12} sm={12} md={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
