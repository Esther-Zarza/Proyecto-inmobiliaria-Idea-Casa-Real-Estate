import React, { lazy, useContext, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import { UserRoutes } from './UserRoutes';
import { AdminRoutes } from './AdminRoutes';
import { AdminLayout } from '../layouts/AdminLayout';
import { UserLayout } from '../layouts/UserLayout';
import { GlobalLayout } from '../layouts/GlobalLayout';
import { AuthContext } from '../context/AuthContextProvider';
import { ChangePassword } from '../pages/userPage/changePassword/ChangePassword';
import { GlobalRoutes } from './GlobalRoutes';
import { RecoverPassword } from '../pages/publicPage/recoverPassword/RecoverPassword';
import { EditUsers } from '../pages/adminPage/editUsers/EditUsers';
import { MyFavoritesHouses } from '../pages/publicPage/LikeHouses/MyFavoritesHouses';
import { Myproperties } from '../pages/userPage/MyProperties/Myproperties';
import { UserEditPropierties } from '../pages/userPage/userEditPropierties/UserEditPropierties';
import ErrorPage from '../pages/publicPage/ErrorPage/ErrorPage';

const Home = lazy(() => import('../pages/publicPage/home/Home'));
const AddUser = lazy(() => import('../pages/adminPage/addUser/AddUser'));
const AddAssessment = lazy(() =>
  import('../pages/publicPage/addAssessment/AddAssessment')
);
const Login = lazy(() => import('../pages/publicPage/Auth/Login'));
const EditProfile = lazy(() =>
  import('../pages/adminPage/editProfile/EditProfile')
);
const AddEstate = lazy(() => import('../pages/adminPage/addEstate/AddEstate'));
const EditProperties = lazy(() =>
  import('../pages/adminPage/editProperties/EditProperties')
);
const EditAppraisals = lazy(() =>
  import('../pages/adminPage/editAppraisal/EditAppraisals')
);
const EditEstate = lazy(() =>
  import('../pages/adminPage/editEstate/EditEstate')
);
const Inmuebles = lazy(() => import('../pages/publicPage/inmuebles/Inmuebles'));
const InfoVivienda = lazy(() =>
  import('../pages/publicPage/infoVivienda/InfoVivienda')
);

export const AppRoutes = () => {
  const { user, loadingUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className='fs-5 fw-bolder text-center'>Cargando...</div>}>
        <Routes>
          {/* Rutas públicas */}
          <Route element={<PublicRoutes user={user} />}>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/addAssessment" element={<AddAssessment />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/infoVivienda/:property_id"
                element={<InfoVivienda />}
              />
              <Route path="/inmuebles" element={<Inmuebles />} />
              <Route path="/recoverPassword" element={<RecoverPassword />} />
              <Route path="/misFavoritos" element={<MyFavoritesHouses />} />
            </Route>
          </Route>

          {/* Rutas de admin */}
          <Route element={<AdminRoutes user={user} loadingUser={loadingUser}/>}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Home />} />
              <Route path="/admin/inmuebles" element={<Inmuebles />} />
              <Route path="/admin/addUser" element={<AddUser />} />
              <Route path="/admin/editUsers" element={<EditUsers />} />
              <Route path="/admin/editProfile" element={<EditProfile />} />
              <Route path="/admin/addEstate" element={<AddEstate />} />
              <Route path="/admin/allProperties" element={<EditProperties />} />
              <Route path="/admin/allAppraisals" element={<EditAppraisals />} />
              <Route
                path="/admin/editEstate/:property_id"
                element={<EditEstate />}
              />
              <Route
                path="/admin/infoVivienda/:property_id"
                element={<InfoVivienda />}
              />
            </Route>
          </Route>

          {/* Rutas de usuario */}
          <Route element={<UserRoutes user={user} loadingUser = {loadingUser} />}>
            <Route element={<UserLayout />}>
              <Route path="/user" element={<Home />} />
              <Route path="/user/inmuebles" element={<Inmuebles />} />
              <Route path="/user/misInmuebles" element={<Myproperties />} />
              <Route path="/user/editProfile" element={<EditProfile />} />
              <Route
                path="/user/infoVivienda/:property_id"
                element={<InfoVivienda />}
              />
              <Route
                path="/user/editPropierties/:property_id"
                element={<UserEditPropierties />}
              />
            </Route>
          </Route>

          {/* Rutas globales */}
          <Route element={<GlobalRoutes />}>
            <Route element={<GlobalLayout user={user} />}>
              <Route
                path="/changePassword/:token"
                element={<ChangePassword />}
              />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
