import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { messageId, vote, userId } = req.body;

    if (!req.user || req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Kontrola, zda již uživatel nehlasoval
    const existingVote = await prisma.vote.findFirst({
      where: {
        messageId: parseInt(messageId),
        userId: parseInt(userId),
      },
    });

    if (existingVote) {
      return res.status(403).json({ message: "User has already voted" });
    }

    // Kontrola hodnoty hlasu
    if (vote < 1 || vote > 5) {
      return res.status(400).json({ message: "Invalid vote value" });
    }

    try {
      const newVote = await prisma.vote.create({
        data: {
          messageId: parseInt(messageId),
          userId: parseInt(userId),
          value: vote,
        },
      });

      const message = await prisma.message.findUnique({
        where: { id: parseInt(messageId) },
        select: { userId: true },
      });

      await prisma.user.update({
        where: { id: message.userId },
        data: {
          elo: {
            increment: vote,
          },
        },
      });

      res.status(200).json(newVote);
    } catch (error) {
      res.status(500).json({ message: "Error updating votes" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
