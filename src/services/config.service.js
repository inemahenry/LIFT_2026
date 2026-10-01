"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
exports.getNumberConfig = getNumberConfig;
exports.getBooleanConfig = getBooleanConfig;
const database_1 = __importDefault(require("../config/database"));
async function getConfig(key) {
    const [rows] = await database_1.default.execute(`SELECT config_value
     FROM business_configs
     WHERE config_key = ?
     LIMIT 1`, [key]);
    const configs = rows;
    if (configs.length === 0) {
        throw new Error(`Business configuration not found: ${key}`);
    }
    return configs[0].config_value;
}
async function getNumberConfig(key) {
    const value = await getConfig(key);
    const number = Number(value);
    if (Number.isNaN(number)) {
        throw new Error(`Invalid numeric configuration: ${key}`);
    }
    return number;
}
async function getBooleanConfig(key) {
    const value = await getConfig(key);
    return value.toLowerCase() === "true";
}
//# sourceMappingURL=config.service.js.map