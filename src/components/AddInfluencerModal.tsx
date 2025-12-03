import React, { useState } from 'react';
import { useInfluencers } from '../hooks/useInfluencers';
import './AddInfluencerModal.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AddInfluencerModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const { addInfluencer } = useInfluencers();
    const [formData, setFormData] = useState({
        nome: '',
        perfil_ig: '',
        youtube: '',
        relevancia: 'Média' as 'Baixa' | 'Média' | 'Alta',
        contato_ig: 'Não' as 'Sim' | 'Não',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addInfluencer(formData);
            setFormData({
                nome: '',
                perfil_ig: '',
                youtube: '',
                relevancia: 'Média',
                contato_ig: 'Não',
            });
            onClose();
        } catch (err) {
            alert('Erro ao adicionar influenciador');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>✨ Adicionar Influenciador</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome *</label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            required
                            placeholder="Nome do influenciador"
                        />
                    </div>

                    <div className="form-group">
                        <label>Instagram</label>
                        <input
                            type="url"
                            value={formData.perfil_ig}
                            onChange={(e) => setFormData({ ...formData, perfil_ig: e.target.value })}
                            placeholder="https://instagram.com/..."
                        />
                    </div>

                    <div className="form-group">
                        <label>YouTube</label>
                        <input
                            type="url"
                            value={formData.youtube}
                            onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                            placeholder="https://youtube.com/..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Relevância</label>
                        <select
                            value={formData.relevancia}
                            onChange={(e) => setFormData({ ...formData, relevancia: e.target.value as any })}
                        >
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Contato IG</label>
                        <select
                            value={formData.contato_ig}
                            onChange={(e) => setFormData({ ...formData, contato_ig: e.target.value as any })}
                        >
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Adicionando...' : 'Adicionar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
