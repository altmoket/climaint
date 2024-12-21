import React from 'react';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import ClientConsult from './pages/ClientConsult';
import Layout from './pages/Layout';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ClientMaintenance from './pages/ClientMaintenance';
import userService from './services/userService';
import Error from './pages/Error';
import { GlobalProvider } from './context/globalContext';

const service = userService()

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register registerUser={service.registerUser} />} />
            <Route path="client-consult" element={<ClientConsult />} />
            <Route path="client-maintance" element={<ClientMaintenance />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
