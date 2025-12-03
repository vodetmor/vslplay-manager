import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import './LoginScreen.css';

export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [trustDevice, setTrustDevice] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-screen">
            <div className="login-container">
                <div className="login-header">
                    <h1>🎬 VSL Manager</h1>
                    <p>Sistema de Gestão de Influenciadores</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="loginEmail">Email</label>
                        <input
                            type="email"
                            id="loginEmail"
                            className="login-input"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginPassword">Senha</label>
                        <input
                            type="password"
                            id="loginPassword"
                            className="login-input"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={trustDevice}
                                onChange={(e) => setTrustDevice(e.target.checked)}
                                disabled={loading}
                            />
                            <span>Confiar neste dispositivo</span>
                        </label>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="btn btn-primary btn-login" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};
