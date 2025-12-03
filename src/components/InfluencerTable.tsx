import React, { useState } from 'react';
import { useInfluencers } from '../hooks/useInfluencers';
import type { Influencer } from '../types';
import './InfluencerTable.css';

export const InfluencerTable: React.FC = () => {
    const { influencers, deleteInfluencer, updateInfluencer, loading } = useInfluencers();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Partial<Influencer>>({});
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const handleEdit = (influencer: Influencer) => {
        setEditingId(influencer.id);
        setEditValues(influencer);
    };

    const handleSave = async () => {
        if (!editingId) return;
        try {
            await updateInfluencer(editingId, editValues);
            setEditingId(null);
            setEditValues({});
        } catch (err) {
            alert('Erro ao salvar');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir?')) return;
        try {
            await deleteInfluencer(id);
            selectedIds.delete(id);
            setSelectedIds(new Set(selectedIds));
        } catch (err) {
            alert('Erro ao excluir');
        }
    };

    const toggleSelect = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.size === 0) return;
        if (!confirm(`Excluir ${selectedIds.size} influenciadores?`)) return;

        try {
            for (const id of selectedIds) {
                await deleteInfluencer(id);
            }
            setSelectedIds(new Set());
        } catch (err) {
            alert('Erro ao excluir selecionados');
        }
    };

    if (loading) {
        return <div className="loading"><div className="spinner"></div></div>;
    }

    return (
        <div className="table-container">
            <div className="table-toolbar">
                <h3>Influenciadores ({influencers.length})</h3>
                {selectedIds.size > 0 && (
                    <button className="btn btn-danger btn-sm" onClick={handleDeleteSelected}>
                        🗑️ Excluir Selecionados ({selectedIds.size})
                    </button>
                )}
            </div>

            {influencers.length === 0 ? (
                <div className="empty-state">
                    <p>Nenhum influenciador cadastrado ainda.</p>
                    <p>Clique em "+ Adicionar Influenciador" para começar!</p>
                </div>
            ) : (
                <div className="table-scroll">
                    <table className="influencer-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedIds(new Set(influencers.map(i => i.id)));
                                    } else {
                                        setSelectedIds(new Set());
                                    }
                                }} /></th>
                                <th>Nome</th>
                                <th>Instagram</th>
                                <th>YouTube</th>
                                <th>Relevância</th>
                                <th>Contato IG</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {influencers.map((inf) => (
                                <tr key={inf.id} className={selectedIds.has(inf.id) ? 'selected' : ''}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.has(inf.id)}
                                            onChange={() => toggleSelect(inf.id)}
                                        />
                                    </td>
                                    <td>
                                        {editingId === inf.id ? (
                                            <input
                                                value={editValues.nome || ''}
                                                onChange={(e) => setEditValues({ ...editValues, nome: e.target.value })}
                                            />
                                        ) : inf.nome}
                                    </td>
                                    <td>{inf.perfil_ig && <a href={inf.perfil_ig} target="_blank">Ver IG</a>}</td>
                                    <td>{inf.youtube && <a href={inf.youtube} target="_blank">Ver YouTube</a>}</td>
                                    <td>
                                        <span className={`badge badge-${inf.relevancia?.toLowerCase()}`}>
                                            {inf.relevancia || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${inf.contato_ig === 'Sim' ? 'success' : 'default'}`}>
                                            {inf.contato_ig || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        {editingId === inf.id ? (
                                            <div className="action-buttons">
                                                <button className="btn btn-sm btn-primary" onClick={handleSave}>✓</button>
                                                <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>✕</button>
                                            </div>
                                        ) : (
                                            <div className="action-buttons">
                                                <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(inf)}>✏️</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(inf.id)}>🗑️</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
