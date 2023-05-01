// pages/api/users.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          elo: 'desc',
        },
      });

      const usersWithPosition = users.map((user, index) => {
        return {
          id: user.id,
          name: user.name,
          elo: user.elo,
        };
      });

      res.status(200).json(usersWithPosition);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
