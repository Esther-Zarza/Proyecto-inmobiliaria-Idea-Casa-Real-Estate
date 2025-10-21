import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useScrollToAnchor from '../hooks/useScrollToAnchor/useScrollToAnchor';

export const PublicRoutes = ({ user }) => {
  const navigate = useNavigate();
  useScrollToAnchor();

  useEffect(()=>{
    if( user?.user_type === 0 || user?.user_type === 1 ){
      navigate('/admin');

    } else if( user?.user_type === 2){
      navigate('/user');
    }

  },[user]);
  return (
    <>
      {!user &&  <Outlet />}
    </>
  );
};
