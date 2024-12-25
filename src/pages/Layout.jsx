import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Leftbar from '../components/Leftbar';

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Grid container display={'flex'}>
        <Grid item md={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
          <Leftbar />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
