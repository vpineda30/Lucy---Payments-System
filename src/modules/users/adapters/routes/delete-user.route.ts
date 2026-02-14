import { Request, Response, Router } from "express";
import { DeleteUserController } from "../controllers/delete-user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const deleteUserRoute = Router();

deleteUserRoute.delete('/delete-user/:id', authMiddleware, async (request: Request<{ id: string }>, response: Response) => {
    const controller = DeleteUserController.build();
    return controller.handler(request, response)
});