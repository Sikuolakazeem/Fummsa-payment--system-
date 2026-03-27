import { useState, useRef, useEffect } from 'react';
import {
  useMarkAllAsRead,
  useMarkAsRead,
  useNotifications,
} from './useNofications';
import { timeAgo } from '../../hook/useTimeAgo';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount } = useNotifications();
  const { mutate: markRead } = useMarkAsRead();
  const { mutate: markAll } = useMarkAllAsRead();
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleNotificationClick = (notification) => {
    if (notification.read === 0) markRead(notification.id);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-text relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
      >
        <span className="text-base">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="bg-bg-card absolute top-11 right-0 z-50 w-80 overflow-hidden rounded-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-text text-sm font-semibold">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-400">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => markAll()}
                className="text-text-muted hover:text-text text-[11px] transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-text-muted flex flex-col items-center justify-center gap-2 py-10">
                <span className="text-3xl">🔕</span>
                <p className="text-xs">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`flex cursor-pointer gap-3 border-b border-white/5 px-4 py-3 transition-colors hover:bg-white/5 ${
                    n.read === 0 ? 'bg-white/[0.03]' : ''
                  }`}
                >
                  <div className="mt-1.5 shrink-0">
                    <div
                      className={`h-2 w-2 rounded-full ${n.read === 0 ? 'bg-primary' : 'bg-transparent'}`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs leading-relaxed ${n.read === 0 ? 'text-text font-medium' : 'text-text-muted'}`}
                    >
                      {n.message}
                    </p>
                    <p className="text-text-muted mt-1 text-[10px]">
                      {timeAgo(n.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
