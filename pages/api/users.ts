import { PrismaClient } from "@prisma/client";
import { getTokenCookie } from "../../lib/cookies";
import { verifyToken } from "../../lib/auth";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const token = getTokenCookie(req);
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id: loggedInUserId } = verifyToken(token);

      const users = await prisma.user.findMany({
        where: {
          id: { not: loggedInUserId },
        },
      });

      const usersWithPosition = users.map((user, index) => {
        return {
          id: user.id,
          name: user.name,
          bgColor: user.bgColor,
          icon: user.icon,
        };
      });

      res.status(200).json(usersWithPosition);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
