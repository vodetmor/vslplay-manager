import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ColumnSchema } from '../types';
import { useAuth } from '../contexts/AuthContext';

const DEFAULT_COLUMNS: ColumnSchema[] = [
    { id: 'nome', label: 'Nome', type: 'text', order: 0, visible: true },
    { id: 'perfil_ig', label: 'Instagram', type: 'url', order: 1, visible: true },
    { id: 'youtube', label: 'YouTube', type: 'url', order: 2, visible: true },
    { id: 'perfil_tiktok', label: 'TikTok', type: 'url', order: 3, visible: true },
    { id: 'site', label: 'Site', type: 'url', order: 4, visible: true },
    { id: 'email', label: 'Email', type: 'text', order: 5, visible: true },
    { id: 'whatsapp', label: 'WhatsApp', type: 'text', order: 6, visible: true },
    { id: 'nicho', label: 'Nicho', type: 'text', order: 7, visible: true },
    { id: 'media_views', label: 'Média de Visualizações', type: 'number', order: 8, visible: true },
    { id: 'relevancia', label: 'Relevância', type: 'select', options: ['Baixa', 'Média', 'Alta'], order: 9, visible: true },
    { id: 'contato_ig', label: 'Contato IG', type: 'select', options: ['Sim', 'Não'], order: 10, visible: true },
    { id: 'teve_retorno', label: 'Teve Retorno', type: 'select', options: ['Sim', 'Não'], order: 11, visible: true },
    { id: 'converteu', label: 'Converteu', type: 'select', options: ['Sim', 'Não'], order: 12, visible: true },
];

export const useColumnSchema = () => {
    const { user } = useAuth();
    const [columns, setColumns] = useState<ColumnSchema[]>(DEFAULT_COLUMNS);
    const [loading, setLoading] = useState(true);

    const loadSchema = async () => {
        if (!user) {
            setColumns(DEFAULT_COLUMNS);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('column_schemas')
                .select('schema_data')
                .eq('user_id', user.id);

            if (error) throw error;

            if (data && data.length > 0) {
                setColumns(data[0].schema_data);
            } else {
                // Initialize with default schema
                await saveSchema(DEFAULT_COLUMNS);
            }
        } catch (err: any) {
            console.error('Error loading schema:', err);
            setColumns(DEFAULT_COLUMNS);
        } finally {
            setLoading(false);
        }
    };

    const saveSchema = async (newSchema: ColumnSchema[]) => {
        if (!user) return;

        try {
            const { error } = await supabase
                .from('column_schemas')
                .upsert({
                    user_id: user.id,
                    schema_data: newSchema,
                }, { onConflict: 'user_id' });

            if (error) throw error;
            setColumns(newSchema);
        } catch (err: any) {
            console.error('Error saving schema:', err);
            throw err;
        }
    };

    useEffect(() => {
        loadSchema();
    }, [user]);

    return {
        columns,
        loading,
        saveSchema,
        refresh: loadSchema,
    };
};
