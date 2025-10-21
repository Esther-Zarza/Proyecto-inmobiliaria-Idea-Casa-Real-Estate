import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useScrollToAnchor from '../hooks/useScrollToAnchor/useScrollToAnchor';

export const UserRoutes = ({ user, loadingUser}) => {
  const navigate = useNavigate();
  useScrollToAnchor();

  useEffect(() => {
    if (loadingUser){
      if (!user) {
      navigate('/');
      } else if (user.user_type === 0 || user.user_type === 1) {
        navigate('/admin');
      }

    }
}, [user, loadingUser]);
  
  return (
    <>
      {user?.user_type === 2 && <Outlet />}
    </>
  );
};
