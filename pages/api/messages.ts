import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.best) {
      const bestMessage = await prisma.message.findFirst({
        orderBy: {
          votes: "desc",
        },
        include: {
          user: true,
        },
      });
      res.json(bestMessage);
    } else {
      const messages = await prisma.message.findMany({
        include: {
          user: true,
        },
      });
      res.json(messages);
    }
  } else if (req.method === "POST") {
    const { messageId, vote, userId } = req.body;

    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const votedUserIds = message.votedUserIds || [];

    if (votedUserIds.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User has already voted for this message" });
    }

    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        votes: message.votes + parseInt(vote, 10),
        votedUserIds: [...votedUserIds, userId],
      },
      include: {
        user: true,
      },
    });

    res.json(updatedMessage);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
