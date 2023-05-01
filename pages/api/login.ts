import { PrismaClient } from '@prisma/client';
import { comparePassword, generateToken } from '../../lib/auth';
import { setTokenCookie } from '../../lib/cookies';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.status(200).json({ user });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
