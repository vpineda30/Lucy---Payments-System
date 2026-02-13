import { UserPayload } from "../../modules/users/adapters/middlewares/auth.middleware.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}