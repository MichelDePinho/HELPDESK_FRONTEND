import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './NewChamado.css';

export default function NewChamado() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/chamados', {
        titulo,
        descricao,
        categoria,
        prioridade,
      });
      navigate('/home');
    } catch {
      alert('Erro ao criar chamado');
    }
  }

  return (
    <div className="newchamado-container">
      <div className="newchamado-card">
        <h2>Abrir Chamado</h2>
        <form className="newchamado-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione a categoria</option>
            <option value="TI">TI</option>
            <option value="Infraestrutura">Infraestrutura</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Outros">Outros</option>
          </select>

          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            required
          >
            <option value="">Selecione a prioridade</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>

          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}
