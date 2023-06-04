import { verifyToken } from "@/lib/auth";
import { getTokenCookie } from "@/lib/cookies";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
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

    const formattedMessages = messages.map(message => {
      const totalPoints = message.Vote.reduce(
        (total, vote) => total + vote.value,
        0,
      );

      const averageVote =
        message.Vote.length > 0 ? totalPoints / message.Vote.length : 0;

      return {
        ...message,
        averageVote: averageVote,
      };
    });

    res.json(formattedMessages);
  } else if (req.method === "POST") {
    const { userId, content } = req.body;
    if (userId && content) {
      try {
        const parsedUserId = parseInt(userId);
        if (isNaN(parsedUserId)) {
          throw new Error(`Invalid userId: ${userId}`);
        }

        const token = getTokenCookie(req);

        if (!token) {
          res.status(401).json({ message: "Not authenticated" });
          return;
        }

        const { id } = verifyToken(token);

        if (!id || parsedUserId === id) {
          res
            .status(400)
            .json({ message: "You cannot send a message to yourself!" });
          return;
        }

        const newMessage = await prisma.message.create({
          data: {
            user: {
              connect: {
                id: parsedUserId,
              },
            },
            content,
          },
        });
        res.status(201).json(newMessage);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating message", error });
      }
    } else {
      if (!userId) {
        res.status(400).json({ message: "Missing userId" });
      } else if (!content) {
        res.status(400).json({ message: "Missing content" });
      } else {
        res.status(400).json({ message: "Bad request" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
