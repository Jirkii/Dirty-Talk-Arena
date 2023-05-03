import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { messageId, vote, userId } = req.body;

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
