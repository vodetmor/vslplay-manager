import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { InfluencerTable } from './components/InfluencerTable';
import { AddInfluencerModal } from './components/AddInfluencerModal';
import './index.css';

const AppContent: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  if (authLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="container">
      <Header />

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Adicionar Influenciador
        </button>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          💡 Todos os dados são salvos automaticamente no Supabase
        </div>
      </div>

      <InfluencerTable />

      <AddInfluencerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
