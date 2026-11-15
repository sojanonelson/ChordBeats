import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StorageService from '../services/StorageService';
import Loading from '../components/Loading';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const userLoggedIn = useSelector((state) => state.general.userLoggedIn);
  const appLoading = useSelector((state) => state.general.appLoading);
  const token = StorageService.gettoken();
  const userId = StorageService.getUserID();

  // If auth state is still validating token from localStorage on initial load
  if (appLoading && token && userId) {
    return <Loading />;
  }

  // Verify authentication
  const isAuthenticated = Boolean(user || userLoggedIn || (token && userId));

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          message: 'Please sign in to access the Music Studio.',
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
