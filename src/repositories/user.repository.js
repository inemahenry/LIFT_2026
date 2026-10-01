"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByPhone = findUserByPhone;
exports.findUserById = findUserById;
exports.createUser = createUser;
const database_1 = __importDefault(require("../config/database"));
const user_model_1 = require("../models/user.model");
async function findUserByPhone(phone) {
    const [rows] = await database_1.default.execute(`SELECT *
     FROM users
     WHERE phone = ?
     LIMIT 1`, [phone]);
    const users = rows;
    return users.length > 0 ? users[0] : null;
}
async function findUserById(id) {
    const [rows] = await database_1.default.execute(`SELECT *
     FROM users
     WHERE id = ?
     LIMIT 1`, [id]);
    const users = rows;
    return users.length > 0 ? users[0] : null;
}
async function createUser(fullName, phone, email, passwordHash, role) {
    const [result] = await database_1.default.execute(`INSERT INTO users
      (full_name, phone, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?)`, [fullName, phone, email, passwordHash, role]);
    return result.insertId;
}
//# sourceMappingURL=user.repository.js.map