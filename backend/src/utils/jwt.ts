import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
  role: string;
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  return secret;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(
    payload,
    getSecret(),
    {
      algorithm: "HS256",
      expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"]
    }
  );
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(
    token,
    getSecret(),
    {
      algorithms: ["HS256"]
    }
  ) as JwtPayload;
}