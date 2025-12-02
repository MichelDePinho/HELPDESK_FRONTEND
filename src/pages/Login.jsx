import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import './Forms.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, senha });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user || res.data.usuario); // ajusta conforme seu backend
      navigate('/home');
    } catch (err) {
      alert('Erro ao entrar: ' + (err.response?.data?.message || err.message));
    }
  }

  return (
    <div className="card">
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <a
        onClick={() => navigate('/register')}
        style={{
          display: 'inline-block',
          textAlign: 'center',
          marginTop: '1rem',
          padding: '0.75rem',
          color: 'rgba(32, 133, 201, 1)',
          borderRadius: '8px',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        Registrar
      </a>
    </div>
  );
}
