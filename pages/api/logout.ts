import { removeTokenCookie } from '../../lib/cookies';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    removeTokenCookie(res);
    res.status(200).json({ message: 'Logged out successfully', redirectTo: '/login'});

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
