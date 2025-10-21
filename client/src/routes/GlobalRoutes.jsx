import React from 'react'
import { Outlet } from 'react-router-dom'
import useScrollToAnchor from '../hooks/useScrollToAnchor/useScrollToAnchor';

export const GlobalRoutes = () => {
  useScrollToAnchor();

  return (
    <>
      <Outlet />
    </>
  )
}
