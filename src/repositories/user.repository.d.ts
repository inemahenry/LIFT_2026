import { User, UserRole } from "../models/user.model";
export declare function findUserByPhone(phone: string): Promise<User | null>;
export declare function findUserById(id: number): Promise<User | null>;
export declare function createUser(fullName: string, phone: string, email: string | null, passwordHash: string, role: UserRole): Promise<number>;
//# sourceMappingURL=user.repository.d.ts.map