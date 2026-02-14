import { Request, Response, Router } from "express";
import { GetUsersController } from "../controllers/get-users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const getUsersRoute = Router();

getUsersRoute.get('/get-users', authMiddleware, async (request: Request, response: Response) => {
    const controller = GetUsersController.build();
    return controller.handler(request, response)
});