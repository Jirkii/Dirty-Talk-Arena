import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(user)
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('/api/me');
        setUser(response.data.user);
        console.log(response)
      } catch (error) {
        console.error('Fetching user failed:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
}
