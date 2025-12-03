export interface Influencer {
    id: string;
    user_id: string;
    nome: string;
    perfil_ig?: string;
    youtube?: string;
    perfil_tiktok?: string;
    site?: string;
    email?: string;
    whatsapp?: string;
    nicho?: string;
    media_views?: number;
    relevancia?: 'Baixa' | 'Média' | 'Alta';
    contato_ig?: 'Sim' | 'Não';
    teve_retorno?: 'Sim' | 'Não';
    converteu?: 'Sim' | 'Não';
    created_at?: string;
    updated_at?: string;
    [key: string]: any;
}

export interface ColumnSchema {
    id: string;
    label: string;
    type: 'text' | 'number' | 'url' | 'select';
    options?: string[];
    order: number;
    visible: boolean;
}

export interface UserColumnSchema {
    id: string;
    user_id: string;
    schema_data: ColumnSchema[];
    created_at: string;
    updated_at: string;
}
