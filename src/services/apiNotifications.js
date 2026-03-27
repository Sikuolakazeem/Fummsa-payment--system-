import { supabase } from './supabase';

// ── Create a notification ──────────────────────────────────────────

export async function createNotification({ userId, message, submissionsId }) {
  const { error } = await supabase.from('notifications').insert([
    {
      user_id: userId,
      message,
      submissions_id: submissionsId,
      read: 0,
    },
  ]);

  console.log('notification insert error:', error);
  if (error) throw new Error(error.message);
}

// ── Get notifications for current user ────────────────────────────
export async function getNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) throw new Error(error.message);
  return data;
}

// ── Mark one as read ───────────────────────────────────────────────
export async function markAsRead(notificationId) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: 1 })
    .eq('id', notificationId);

  if (error) throw new Error(error.message);
}

// ── Mark all as read ───────────────────────────────────────────────
export async function markAllAsRead(userId) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: 1 })
    .eq('user_id', userId)
    .eq('read', false);

  if (error) throw new Error(error.message);
}
