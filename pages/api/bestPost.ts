import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const topMessage = await prisma.message.findFirst({
        orderBy: {},
        select: {
          user: {
            select: {
              name: true,
            },
          },
          content: true,
          Vote: {
            select: {
              value: true,
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
