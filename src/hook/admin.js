import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user || data.user.user_metadata.role !== 'admin') {
        router.push('/login'); // redirect if not admin
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;
  return <h1>Welcome Admin!</h1>;
}
