import { PrismaClient } from "@prisma/client";
import { getTokenCookie } from "../../lib/cookies";
import { verifyToken } from "../../lib/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const token = getTokenCookie(req);

      if (!token) {
        redirect("/login");
      }

      const { id } = verifyToken(token);

      if (!id) {
        redirect("/login");
      }

      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
