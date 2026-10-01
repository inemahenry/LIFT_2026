"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const express_1 = require("express");
const jwt_1 = require("../utils/jwt");
function authenticate(req, res, next) {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Authentication required"
            });
            return;
        }
        const token = header.substring(7);
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = {
            userId: payload.userId,
            role: payload.role
        };
        next();
    }
    catch {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}
//# sourceMappingURL=auth.middleware.js.map