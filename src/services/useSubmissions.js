import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../feature/authentication/useUser';
import { getMySubmissions } from './apiSubmissions';
import { supabase } from './supabase';

export function useMySubmissions() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['my-submissions', user?.id],
    queryFn: () => getMySubmissions(user?.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('my-submissions-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'submissions',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ['my-submissions', user.id],
          });
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user?.id, queryClient]);

  return query;
}
