import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  console.log('PrivateRoute user:', user);
  return user ? children : <Navigate to="/login" />;
}
