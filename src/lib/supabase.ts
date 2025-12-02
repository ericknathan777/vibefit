import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export interface User {
  id: string;
  email: string;
  nome: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  peso_inicial: number;
  peso_atual: number;
  altura: number;
  idade: number;
  objetivo: string;
  nivel: string;
  local: string;
  tempo: string;
  frequencia: string;
  created_at: string;
  updated_at: string;
}

export interface Treino {
  id: string;
  user_id: string;
  nome: string;
  duracao: number;
  tipo: string;
  concluido: boolean;
  data: string;
  created_at: string;
}

export interface Habito {
  id: string;
  user_id: string;
  tipo: string;
  concluido: boolean;
  data: string;
  created_at: string;
}

export interface RegistroPeso {
  id: string;
  user_id: string;
  peso: number;
  data: string;
  created_at: string;
}
