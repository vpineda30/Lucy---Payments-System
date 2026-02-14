import { Request, Response, Router } from "express";
import { UpdateUserController } from "../controllers/update-user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const updateUserRoute = Router();

updateUserRoute.put('/update-user/:id', authMiddleware, async (request: Request<{ id: string }>, response: Response) => {
    const controller = UpdateUserController.build();
    return controller.handler(request, response);
});