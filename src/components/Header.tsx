import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
    const { user, signOut } = useAuth();

    return (
        <header className="header">
            <div className="header-content">
                <h1>🎬 VSLPlay Influencers Manager</h1>
                <p className="subtitle">Mapeie, qualifique e priorize influenciadores para embaixadores</p>
            </div>
            <div className="header-right">
                <div className="connection-status status-online" title={`Conectado como ${user?.email}`}>
                    <span className="status-dot"></span>
                    <span className="status-text">Online (Supabase)</span>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={signOut} title="Sair do sistema">
                    🚪 Sair
                </button>
            </div>
        </header>
    );
};
