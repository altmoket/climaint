import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/client-consult">Client Consult</Link></li>
            <li><Link to="/client-maintance">Client Maintance</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* This is where the routed component will render */}
      </main>
      <footer>
        <p>My App Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
