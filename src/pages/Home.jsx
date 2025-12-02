import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';
import { Trash2, CheckCircle } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const [chamados, setChamados] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroPrioridade, setFiltroPrioridade] = useState('');

  useEffect(() => {
    load();
  }, [user]);

  async function load() {
    if (!user) return;
    const url = user.perfil === 'tecnico' ? '/chamados' : '/chamados/me';
    const res = await api.get(url);
    setChamados(res.data);
  }

  async function remove(id) {
    if (!confirm('Excluir chamado?')) return;
    await api.delete(`/chamados/${id}`);
    setChamados(chamados.filter((c) => c.id !== id));
  }

  async function concluirChamado(id) {
    const confirmar = confirm('Marcar este chamado como Concluído?');
    if (!confirmar) return;

    try {
      await api.put(`/chamados/${id}`, { status: 'Concluido' });
      setChamados((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: 'Concluido' } : c))
      );
    } catch (err) {
      console.error('Erro ao concluir chamado:', err);
      alert('Erro ao atualizar status.');
    }
  }

  // Função para remover acentos
  const removeAcento = (str) =>
    str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

  const chamadosFiltrados = chamados.filter((c) => {
    const nomeMatch = c.usuario?.nome
      ?.toLowerCase()
      .includes(filtroNome.toLowerCase());

    const statusMatch = filtroStatus ? c.status === filtroStatus : true;

    const prioridadeMatch = filtroPrioridade
      ? removeAcento(c.prioridade || '').toLowerCase() ===
        removeAcento(filtroPrioridade).toLowerCase()
      : true;

    return nomeMatch && statusMatch && prioridadeMatch;
  });

  const formatarData = (data) => {
    if (!data) return '-';
    const d = new Date(data);
    return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  };

  const prioridadeClass = (p) => {
    if (!p) return 'prioridade-media';
    const key = removeAcento(p).toLowerCase();
    return key === 'alta' ? 'prioridade-alta' : key === 'baixa' ? 'prioridade-baixa' : 'prioridade-media';
  };

  const prioridadeLabel = (p) => {
    if (!p) return 'Média';
    const key = removeAcento(p).toLowerCase();
    if (key === 'alta') return 'Alta';
    if (key === 'baixa') return 'Baixa';
    return 'Média';
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h2 className="home-title">
          {user?.perfil === 'tecnico' ? 'Chamados' : 'Meus Chamados'}
        </h2>

        {user?.perfil === 'tecnico' && (
          <div className="filtro-container">
            <input
              type="text"
              placeholder="Filtrar por criador..."
              className="filtro-input"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />
            <select
              className="filtro-select"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Aberto">Aberto</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluido">Concluído</option>
            </select>
            <select
              className="filtro-select"
              value={filtroPrioridade}
              onChange={(e) => setFiltroPrioridade(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
        )}
      </div>

      <div className="chamados-scroll">
        {chamadosFiltrados.length === 0 ? (
          <p className="no-chamados">Nenhum chamado encontrado.</p>
        ) : (
          chamadosFiltrados.map((c) => (
            <div key={c.id} className="chamado-card">
              <div className="chamado-left">
                <h3 className="chamado-titulo">{c.titulo}</h3>
                <p className="chamado-descricao">{c.descricao}</p>

                <div className="chamado-detalhes-left">
                  <div className="chamado-categoria">
                    <b>Categoria:</b>{' '}
                    <span className="chamado-categoria-val">{c.categoria || 'Não informada'}</span>
                  </div>

                  <div className="chamado-prioridade-label">
                    <b>Prioridade:</b>{' '}
                    <span className={prioridadeClass(c.prioridade)}>
                      {prioridadeLabel(c.prioridade)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="chamado-center">
                <p className="chamado-status">
                  <span className={
                    c.status === 'Concluido'
                      ? 'status-concluido'
                      : c.status === 'Em andamento'
                        ? 'status-andamento'
                        : 'status-aberto'
                  }>
                    {c.status}
                  </span>
                </p>
              </div>

              <div className="chamado-actions">
                {user.perfil === 'tecnico' && (
                  <>
                    <Link to={`/edit/${c.id}`}>
                      <button className="btn btn-primary">Editar</button>
                    </Link>
                    {c.status !== 'Concluido' && (
                      <button
                        className="btn-concluir"
                        onClick={() => concluirChamado(c.id)}
                        title="Marcar como concluído"
                      >
                        <CheckCircle size={22} strokeWidth={2} />
                      </button>
                    )}
                    <button
                      className="btn-trash"
                      onClick={() => remove(c.id)}
                      title="Excluir chamado"
                    >
                      <Trash2 size={20} strokeWidth={2} />
                    </button>
                  </>
                )}
              </div>

              <div className="chamado-right-bottom">
                {c.usuario && <div className="right-line">Criado por: {c.usuario.nome}</div>}
                <div className="right-line small">Criado: {formatarData(c.criado_em)}</div>
                <div className="right-line small">Atualizado: {formatarData(c.atualizado_em)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
