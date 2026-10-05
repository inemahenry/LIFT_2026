import pool from "../config/database";
import { User, UserRole } from "../models/user.model";

export async function findUserByPhone(
  phone: string
): Promise<User | null> {
  const [rows] = await pool.execute(
    `SELECT *
     FROM users
     WHERE phone = ?
     LIMIT 1`,
    [phone]
  );

  const users = rows as User[];

  return users.length > 0 ? users[0] : null;
}

export async function findUserById(
  id: number
): Promise<User | null> {
  const [rows] = await pool.execute(
    `SELECT *
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [id]
  );

  const users = rows as User[];

  return users.length > 0 ? users[0] : null;
}

export async function createUser(
  fullName: string,
  phone: string,
  email: string | null,
  passwordHash: string,
  role: UserRole
): Promise<number> {
  const [result] = await pool.execute(
    `INSERT INTO users
      (full_name, phone, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?)`,
    [fullName, phone, email, passwordHash, role]
  );

  return (result as { insertId: number }).insertId;
}