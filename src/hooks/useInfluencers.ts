import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Influencer } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useInfluencers = () => {
    const { user } = useAuth();
    const [influencers, setInfluencers] = useState<Influencer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadInfluencers = async () => {
        if (!user) {
            setInfluencers([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('influencers')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setInfluencers(data || []);
            setError(null);
        } catch (err: any) {
            console.error('Error loading influencers:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addInfluencer = async (influencer: Omit<Influencer, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
        if (!user) throw new Error('User not authenticated');

        try {
            const { data, error } = await supabase
                .from('influencers')
                .insert({
                    ...influencer,
                    user_id: user.id,
                })
                .select()
                .single();

            if (error) throw error;
            setInfluencers([data, ...influencers]);
            return data;
        } catch (err: any) {
            console.error('Error adding influencer:', err);
            setError(err.message);
            throw err;
        }
    };

    const updateInfluencer = async (id: string, updates: Partial<Influencer>) => {
        if (!user) throw new Error('User not authenticated');

        try {
            const { data, error } = await supabase
                .from('influencers')
                .update(updates)
                .eq('id', id)
                .eq('user_id', user.id)
                .select()
                .single();

            if (error) throw error;
            setInfluencers(influencers.map((inf) => (inf.id === id ? data : inf)));
            return data;
        } catch (err: any) {
            console.error('Error updating influencer:', err);
            setError(err.message);
            throw err;
        }
    };

    const deleteInfluencer = async (id: string) => {
        if (!user) throw new Error('User not authenticated');

        try {
            const { error } = await supabase
                .from('influencers')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id);

            if (error) throw error;
            setInfluencers(influencers.filter((inf) => inf.id !== id));
        } catch (err: any) {
            console.error('Error deleting influencer:', err);
            setError(err.message);
            throw err;
        }
    };

    useEffect(() => {
        loadInfluencers();
    }, [user]);

    return {
        influencers,
        loading,
        error,
        addInfluencer,
        updateInfluencer,
        deleteInfluencer,
        refresh: loadInfluencers,
    };
};
