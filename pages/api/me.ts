import { PrismaClient } from "@prisma/client";
import { getTokenCookie } from "../../lib/cookies";
import { verifyToken } from "../../lib/auth";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const token = getTokenCookie(req);

      if (!token) {
        res.status(401).json({ message: "Not authenticated" });
        return;
      }

      const { id } = verifyToken(token);

      if (!id) {
        res.status(401).json({ message: "Not authenticated" });
        return;
      }

      let user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      console.log(user);
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
