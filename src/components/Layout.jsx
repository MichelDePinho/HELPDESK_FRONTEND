import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="page">
      <nav className="nav">
        {/* Lado esquerdo */}
        <div className="nav-left">
          {user ? (
            <>
              <Link className="nav-link" to="/home">Chamados</Link>
              <Link className="nav-link" to="/new">Abrir Chamado</Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Entrar</Link>
              <Link className="nav-link" to="/register">Registrar</Link>
            </>
          )}
        </div>

        {/* Lado direito */}
        {user && (
          <div className="nav-right">
            {user.perfil === 'usuario' ? (
              <span className="user-info">{user.nome}</span>
            ) : (
              <span className="user-info">{user.perfil}</span>
            )}
            <button className="nav-button" onClick={logout}>Sair</button>
          </div>
        )}
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
