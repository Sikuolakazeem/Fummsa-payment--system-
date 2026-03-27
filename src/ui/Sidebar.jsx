import Logout from '../feature/authentication/Logout';
import { useUser } from '../feature/authentication/useUser';

function Sidebar({ open, setOpen }) {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  const role = user?.role || 'No role';
  const email = user?.email || 'No email';
  const userName = user?.username || 'No name';

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`border-border fixed top-0 left-0 z-50 flex h-screen w-70 shrink-0 flex-col border-r bg-white transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="bg-text text-bg flex h-7 w-7 items-center justify-center rounded-full text-[1.1rem] font-bold">
              F
            </div>
            <span className="text-text text-sm font-medium">Fummsa</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-text hover:text-text/50 cursor-pointer rounded-md border-none bg-transparent p-1 text-[1.3rem] font-bold transition-all md:hidden"
          >
            ✕
          </button>
        </div>

        <div className="flex-1" />

        <div className="border-text border-t p-3">
          <div className="flex cursor-pointer items-center gap-3">
            <div className="bg-text text-bg flex h-8 w-8 items-center justify-center rounded-full text-[1.1rem] font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="text-text m-0 text-[1rem] font-medium">
                  {userName}
                </p>
                <p className="text-text m-0 text-[1rem] font-medium">{email}</p>
                <p className="text-text m-0 text-[1rem] font-medium">{role}</p>
              </div>
              <Logout />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
