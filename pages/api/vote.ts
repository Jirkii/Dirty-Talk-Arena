import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { messageId, vote, userId } = req.body;

    try {
      const message = await prisma.message.findUnique({
        where: { id: messageId },
        include: { user: true },
      });

      const votedUserIds = JSON.parse(message.votedUserIds || "[]");

      if (votedUserIds.includes(userId)) {
        throw new Error("User has already voted");
      }

      votedUserIds.push(userId);

      const newVoteCount = message.votes + parseInt(vote, 10);

      const updatedMessage = await prisma.message.update({
        where: { id: messageId },
        data: { votes: newVoteCount, votedUserIds: JSON.stringify(votedUserIds) },
      });

      // Update the user's Elo
      const updatedElo = message.user.elo + vote;
      const updatedUser = await prisma.user.update({
        where: { id: message.user.id },
        data: { elo: updatedElo },
      });

      res.status(200).json(updatedMessage);
    } catch (error) {
      console.error("Error updating votes:", error);
      res.status(500).json({ message: "Error updating votes" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}