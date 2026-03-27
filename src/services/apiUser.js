import { supabase } from './supabase';

export async function getSubmissions(role) {
  const { data, error } = await supabase
    .from('submissions')
    .select('*, beneficiary(*))')
    .eq('current_stage', role)
    .order('created_at', { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
