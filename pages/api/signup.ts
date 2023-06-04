import { PrismaClient } from "@prisma/client";
import { hashPassword, generateToken } from "../../lib/auth";
import { setTokenCookie } from "../../lib/cookies";

const prisma = new PrismaClient();

// Funkce pro generování náhodné barvy
export function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Funkce pro náhodný výběr obrázku
export function selectRandomImage() {
  const imageIndex = Math.floor(Math.random() * 8) + 1; // náhodné číslo mezi 1 a 8
  return `0${imageIndex}.png`; // výsledný název souboru
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Změna barvy a loga
    return res.status(200).json({
      color: generateRandomColor(),
      logo: selectRandomImage(),
    });
  } else if (req.method === "POST")
    try {
      const { email, password, name } = req.body;

      // Validace
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Neplatný e-mail." });
      }
      if (!password || password.length < 6) {
        return res
          .status(400)
          .json({ error: "Heslo musí mít alespoň 6 znaků." });
      }
      if (!name || name.length < 2) {
        return res
          .status(400)
          .json({ error: "Jméno musí mít alespoň 2 znaky." });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name,
          elo: 0,
          bgColor: req.body.color,
          icon: req.body.logo,
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
