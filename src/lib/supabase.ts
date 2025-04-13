
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Your Supabase URL and anon key will be provided when you connect to Supabase in Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please make sure you have connected to Supabase in Lovable and set up your environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
