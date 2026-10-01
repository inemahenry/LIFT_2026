"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "LIFT API is running"
    });
});
app.use("/api/auth", auth_routes_1.default);
app.get("/api/auth/me", auth_middleware_1.authenticate, (req, res) => {
    res.json({
        success: true,
        data: req.user
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map