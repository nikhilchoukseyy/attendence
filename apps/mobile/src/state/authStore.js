import { useEffect, useState } from 'react';
import { loadUser, loadToken, saveSession, clearSession } from '../services/authStorage';

export function useAuthStore() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [storedToken, storedUser] = await Promise.all([loadToken(), loadUser()]);
      setToken(storedToken);
      setUser(storedUser);
      setLoading(false);
    })();
  }, []);

  return {
    token,
    user,
    loading,
    signIn: async (nextToken, nextUser) => {
      await saveSession(nextToken, nextUser);
      setToken(nextToken);
      setUser(nextUser);
    },
    signOut: async () => {
      await clearSession();
      setToken(null);
      setUser(null);
    }
  };
}
