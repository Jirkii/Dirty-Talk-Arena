import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout');
      console.log('Logged out successfully');
      router.push(response.data.redirectTo);
    } catch (error) {
      console.error('Logout failed:', error.response.data.message);
    }
  };

  return (
    <button onClick={handleLogout} className='border-primary border px-4 py-2 rounded-lg bg-secondary text-white font-medium hover:bg-black transition-colors'>
      Odhlásit se
    </button>
  );
}

export default LogoutButton;