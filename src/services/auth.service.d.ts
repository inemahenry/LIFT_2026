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
export declare function register(input: RegisterInput): Promise<{
    userId: number;
    role: string;
    token: string;
}>;
export declare function login(input: LoginInput): Promise<{
    userId: number;
    fullName: string;
    phone: string;
    role: UserRole;
    token: string;
}>;
export {};
//# sourceMappingURL=auth.service.d.ts.map