"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT || 5000);
async function startServer() {
    try {
        const connection = await database_1.default.getConnection();
        await connection.ping();
        connection.release();
        console.log("✅ MySQL database connected successfully");
        app_1.default.listen(PORT, () => {
            console.log(`🚗 LIFT API running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ MySQL connection failed:", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map