import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NewChamado from './pages/NewChamado';
import EditChamado from './pages/EditChamado';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas */}
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="home" element={<Home />} />
          <Route path="new" element={<NewChamado />} />
          <Route path="edit/:id" element={<EditChamado />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
