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
      const totalVotes = message.Vote.reduce(
        (total, vote) => total + vote.value,
        0,
      );

      return {
        ...message,
        createdAt: new Date(message.createdAt).toLocaleDateString("cs-CZ"),
        totalVotes: totalVotes,
      };
    });

    res.json(formattedMessages);
  } else if (req.method === "POST") {
    const { userId, content } = req.body;

    if (userId && content) {
      try {
        const newMessage = await prisma.message.create({
          data: {
            user: {
              connect: {
                id: parseInt(userId),
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
