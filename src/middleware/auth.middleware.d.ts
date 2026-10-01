import { NextFunction, Request, Response } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        role: string;
    };
}
export declare function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.middleware.d.ts.map