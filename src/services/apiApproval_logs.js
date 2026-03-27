import { supabase } from './supabase';

export async function getSubmissionsForApproval() {
  const { data, error } = await supabase.from('approval_logs').select('*');
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}
