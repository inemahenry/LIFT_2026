"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositories/user.repository");
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../models/user.model");
async function register(input) {
    const existingUser = await (0, user_repository_1.findUserByPhone)(input.phone);
    if (existingUser) {
        throw new Error("Phone number already registered");
    }
    const role = input.role === "DRIVER"
        ? "DRIVER"
        : "PASSENGER";
    const passwordHash = await bcrypt_1.default.hash(input.password, 12);
    const userId = await (0, user_repository_1.createUser)(input.fullName, input.phone, input.email || null, passwordHash, role);
    if (role === "DRIVER") {
        const pool = (await import("../config/database")).default;
        await pool.execute(`INSERT INTO drivers (user_id)
       VALUES (?)`, [userId]);
    }
    else {
        const pool = (await import("../config/database")).default;
        await pool.execute(`INSERT INTO passengers (user_id)
       VALUES (?)`, [userId]);
    }
    const token = (0, jwt_1.generateToken)({
        userId,
        role
    });
    return {
        userId,
        role,
        token
    };
}
async function login(input) {
    const user = await (0, user_repository_1.findUserByPhone)(input.phone);
    if (!user) {
        throw new Error("Invalid phone number or password");
    }
    if (user.status !== "ACTIVE") {
        throw new Error("Account is not active");
    }
    const passwordMatches = await bcrypt_1.default.compare(input.password, user.password_hash);
    if (!passwordMatches) {
        throw new Error("Invalid phone number or password");
    }
    const token = (0, jwt_1.generateToken)({
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
//# sourceMappingURL=auth.service.js.map