import { supabase } from './supabase';

export async function getBeneficiary() {
  const { data, error } = await supabase.from('beneficiary').select('*');

  if (error) {
    console.error('Error fetching beneficiary data');
    throw new Error('an error occurred while fetching data');
  }
  return data;
}

export async function createBeneficiary(newBeneficiary) {
  const { data, error } = await supabase
    .from('beneficiary')
    .insert([newBeneficiary])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
