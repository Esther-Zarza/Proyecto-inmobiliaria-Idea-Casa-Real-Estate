import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarAdmin } from '../components/navbars/NavbarAdmin';
import { FooterAdminPhone } from '../components/footers/footerAdmin/FooterAdminPhone';
import { FooterAdmin } from '../components/footers/footerAdmin/FooterAdmin';

export const AdminLayout = () => {
  return (
    <>
      <header>
        <NavbarAdmin />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterAdmin />
        <FooterAdminPhone />
      </footer>
    </>
  );
};
