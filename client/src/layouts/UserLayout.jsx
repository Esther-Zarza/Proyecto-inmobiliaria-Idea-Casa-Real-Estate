import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarUser } from '../components/navbars/NavbarUser';
import { FooterUserPhone } from '../components/footers/footerUser/FooterUserPhone';
import { FooterUser } from '../components/footers/footerUser/FooterUser';


export const UserLayout = () => {
  return (
    <>
      <header>
        <NavbarUser />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterUser />
        <FooterUserPhone />
      </footer>
    </>
  );
};
