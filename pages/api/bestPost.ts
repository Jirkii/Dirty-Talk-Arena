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
          content: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });
      res.status(200).json(topMessage);
    } catch (error) {
      res.status(500).json({ message: "Error fetching top message" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
