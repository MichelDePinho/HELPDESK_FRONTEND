import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import './Forms.css';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('usuario');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/auth/register', { nome, email, senha, perfil });
      alert('Registrado com sucesso!');
      navigate('/login');
    } catch {
      alert('Erro ao registrar');
    }
  }

  return (
    <div className="card">
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
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
        <select
          value={perfil}
          onChange={e => setPerfil(e.target.value)}
          required
        >
          <option value="usuario">Usuário</option>
          <option value="tecnico">Técnico</option>
        </select>
        <button type="submit">Registrar</button>
      </form>

      <p className="form-link">
        Já possui conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}
