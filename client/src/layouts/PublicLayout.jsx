import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarPublic } from '../components/navbars/NavbarPublic';
import { FooterPhone } from '../components/footers/footerPublic/FooterPhone';
import Footer from '../components/footers/footerPublic/Footer';


export const PublicLayout = () => {
  return (
    <>
      <header>
        <NavbarPublic />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
        <FooterPhone/>
      </footer>
    </>
  );
};
