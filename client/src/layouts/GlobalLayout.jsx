import { Outlet } from 'react-router-dom';
import { NavbarPublic } from '../components/navbars/NavbarPublic';
import { NavbarAdmin } from '../components/navbars/NavbarAdmin';
import { NavbarUser } from '../components/navbars/NavbarUser';
import { FooterPhone } from '../components/footers/footerPublic/FooterPhone';
import Footer from '../components/footers/footerPublic/Footer';

export const GlobalLayout = ({ user }) => {
  return (
    <>
      <header>
        {!user && <NavbarPublic />}
        {user?.user_type === 2 && <NavbarUser />}
        {(user?.user_type === 0 || user?.user_type === 1) &&  <NavbarAdmin />}
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
