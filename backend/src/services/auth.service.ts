import bcrypt from "bcrypt";
import {
  createUser,
  findUserByPhone
} from "../repositories/user.repository";
import { generateToken } from "../utils/jwt";
import { UserRole } from "../models/user.model";

interface RegisterInput {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  role?: UserRole;
}

interface LoginInput {
  phone: string;
  password: string;
}

export async function register(input: RegisterInput) {
  const existingUser = await findUserByPhone(input.phone);

  if (existingUser) {
    throw new Error("Phone number already registered");
  }

  const role =
    input.role === "DRIVER"
      ? "DRIVER"
      : "PASSENGER";

  const passwordHash = await bcrypt.hash(input.password, 12);

  const userId = await createUser(
    input.fullName,
    input.phone,
    input.email || null,
    passwordHash,
    role
  );

  if (role === "DRIVER") {
    const pool = (await import("../config/database")).default;

    await pool.execute(
      `INSERT INTO drivers (user_id)
       VALUES (?)`,
      [userId]
    );
  } else {
    const pool = (await import("../config/database")).default;

    await pool.execute(
      `INSERT INTO passengers (user_id)
       VALUES (?)`,
      [userId]
    );
  }

  const token = generateToken({
    userId,
    role
  });

  return {
    userId,
    role,
    token
  };
}

export async function login(input: LoginInput) {
  const user = await findUserByPhone(input.phone);

  if (!user) {
    throw new Error("Invalid phone number or password");
  }

  if (user.status !== "ACTIVE") {
    throw new Error("Account is not active");
  }

  const passwordMatches = await bcrypt.compare(
    input.password,
    user.password_hash
  );

  if (!passwordMatches) {
    throw new Error("Invalid phone number or password");
  }

  const token = generateToken({
    userId: user.id,
    role: user.role
  });

  return {
    userId: user.id,
    fullName: user.full_name,
    phone: user.phone,
    role: user.role,
    token
  };
}