import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Divider, Grid, Stack} from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Leftbar from '../components/Leftbar';

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />
      {/* <Divider></Divider> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item md={4} lg={3} display={{ xs: 'none', md: 'block' }} flex={true}>
            <Leftbar />
          </Grid>
          <Grid item bgcolor={"red"} display="flex" justifyContent="center" height="100%">
            <Box sx={{ textAlign: 'center' }}> 
              <Outlet />
            </Box>
          </Grid>
        </Grid> */}
        <Stack direction={"row"}>
          <Box width={"20%"}>
            <Leftbar />
          </Box>
          <Box width={"stretch"}>
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Layout;
