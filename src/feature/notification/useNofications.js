import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from '../../services/apiNotifications';
import { useUser } from '../authentication/useUser';

export function useNotifications() {
  const { user } = useUser();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => getNotifications(user?.id),
    enabled: !!user?.id,
    refetchInterval: 30000, // refetch every 30 seconds
  });

  const unreadCount = notifications.filter((n) => n.read === 0).length;
  return { notifications, unreadCount, isLoading };
}

export function useMarkAsRead() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.id] });
    },
  });
}

export function useMarkAllAsRead() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllAsRead(user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.id] });
    },
  });
}
