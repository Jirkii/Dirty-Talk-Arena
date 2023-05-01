import { PrismaClient } from "@prisma/client";
import { hashPassword, generateToken } from "../../lib/auth";
import { setTokenCookie } from "../../lib/cookies";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name,
        elo: 0,
      },
    });

    const token = generateToken(newUser);
    setTokenCookie(res, token);
    return res.status(200).json({ user: newUser, redirectTo: "/" });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}
