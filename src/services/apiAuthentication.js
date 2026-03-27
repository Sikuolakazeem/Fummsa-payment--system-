import { supabase } from './supabase';

export async function signUp({ email, password, userName, role }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        userName,
        role,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  // synchronize role (from profile table) with the authMetadata...

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .maybeSingle();

  if (!profile) throw new Error('No profile found for this user');

  if (profileError) throw new Error(profileError.message);

  // Return merged data so role is accessible in onSuccess
  return { ...data, role: profile.role };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data: authData, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, userName')

    .eq('id', authData.user.id)
    .single();

  if (profileError) throw new Error(profileError.message);

  return {
    ...authData.user,
    role: profile?.role,
    username: profile?.userName,
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    // this link should navigate to the update password page
    // redirectTo: `${window.location.origin}/resetPassword`,
    redirectTo: `${window.location.origin}/update-password`,
  });
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateUser(password) {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// export async function phoneLogin() {
//   const { data, error } = await supabase.auth.signInWithOtp({
//     phone: '+13334445555',
//   });
// }
