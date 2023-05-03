import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || "your-secret-key";

export async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret);
}

export function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}
