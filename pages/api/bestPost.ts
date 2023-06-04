import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const group = await prisma.vote.groupBy({
        by: ["messageId"],
        orderBy: {
          _sum: {
            value: "desc",
          },
        },
        take: 1,
      });

      const topMessage = await prisma.message.findUnique({
        where: {
          id: group[0].messageId,
        },
        select: {
          id: true,
          content: true,
          userId: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              icon: true,
              bgColor: true,
            },
          },
          Vote: {
            select: {
              value: true,
              userId: true,
            },
          },
        },
      });

      const totalPoints = topMessage?.Vote.reduce(
        (total, vote) => total + vote.value,
        0,
      );

      const averageVote =
        topMessage?.Vote.length > 0 ? totalPoints / topMessage?.Vote.length : 0;

      const formattedMessage = {
        ...topMessage,
        averageVote: averageVote,
      };
      res.status(200).json(formattedMessage);
    } catch (error) {
      res.status(500).json({ message: "Error fetching top message" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
