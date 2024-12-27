import React from 'react';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import ClientConsult from './pages/ClientConsult';
import Layout from './pages/Layout';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ClientMaintenance from './pages/ClientMaintenance';
import Error from './pages/Error';
import { GlobalProvider } from './context/globalContext';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <GlobalProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="client-consult" element={<ClientConsult />} />
            <Route path="client-maintenance" element={<ClientMaintenance />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
    </ThemeProvider>
      
  );
}

export default App;
