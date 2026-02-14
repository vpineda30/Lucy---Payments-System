import { UserPayload } from "../../modules/users/adapters/middlewares/auth.middleware.ts";

declare global {
    namespace Express {
        export interface Request {
            user?: UserPayload;
        }
    }
}