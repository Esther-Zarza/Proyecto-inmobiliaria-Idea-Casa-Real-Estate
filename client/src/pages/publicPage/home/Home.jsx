import React from 'react';
import { Services } from '../../../components/services/Services';
import { ServicesPhone } from '../../../components/services/ServicesPhone';
import { NuevosInmueblesDisp } from '../../../components/NuevosInmueblesDisp/NuevosInmueblesDisp';
import { InmueblesDestacados } from '../../../components/InmueblesDestacados/InmueblesDestacados';
import { FormBusquedaHome } from '../../../components/forms/formBusquedaHome/FormBusquedaHome';
import { Contact } from '../../../components/contact/Contact';


const Home = () => {
  return (
    <>
      <FormBusquedaHome />
      <NuevosInmueblesDisp />
      <InmueblesDestacados />
      <Services />
      <ServicesPhone />
      <Contact />
    </>
  );
};

export default Home;
