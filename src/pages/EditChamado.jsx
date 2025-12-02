import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import './EditChamado.css';

export default function EditChamado() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('Aberto');
  const [categoria, setCategoria] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    try {
      const res = await api.get('/chamados/' + id);
      setTitulo(res.data.titulo || '');
      setDescricao(res.data.descricao || '');
      setStatus(res.data.status || 'Aberto');
      setCategoria(res.data.categoria || '');
      setPrioridade(res.data.prioridade || '');
    } catch (err) {
      console.error('Erro ao carregar chamado:', err);
      alert('Erro ao carregar chamado');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put('/chamados/' + id, {
        titulo,
        descricao,
        status,
        categoria,
        prioridade,
      });
      navigate('/home');
    } catch (err) {
      console.error('Erro ao atualizar chamado:', err);
      alert('Erro ao atualizar chamado');
    }
  }

  return (
    <div className="editchamado-container">
      <div className="editchamado-card">
        <h2>Editar Chamado</h2>
        <form onSubmit={handleSubmit} className="editchamado-form">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            required
          />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            required
          />
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="">Selecione a categoria</option>
            <option value="TI">TI</option>
            <option value="Infraestrutura">Infraestrutura</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Outros">Outros</option>
          </select>
          <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} required>
            <option value="">Selecione a prioridade</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Aberto">Aberto</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluido">Concluido</option>
          </select>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
