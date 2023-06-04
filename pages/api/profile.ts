import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const profile = await prisma.message.findMany({
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

    res.json(profile);
  }
}
