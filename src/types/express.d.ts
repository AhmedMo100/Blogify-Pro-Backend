import { IUser } from "../modules/users/user.model";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                role: "user" | "admin";
            };
        }
    }
}
